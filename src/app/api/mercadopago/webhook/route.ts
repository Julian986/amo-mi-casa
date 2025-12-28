import { NextResponse } from "next/server";
import { findOrderByPreferenceId, findOrderByPaymentId, updateOrderStatus } from "@/lib/orders";

/**
 * Webhook de Mercado Pago
 * Recibe notificaciones cuando cambia el estado de un pago
 * 
 * Documentación: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
 */
export async function POST(request: Request) {
  try {
    // Log del request completo para debugging
    const rawBody = await request.text();
    const url = new URL(request.url);
    
    console.log("[webhook] Raw request received", {
      method: request.method,
      url: request.url,
      queryParams: Object.fromEntries(url.searchParams.entries()),
      headers: Object.fromEntries(request.headers.entries()),
      bodyLength: rawBody.length,
      hasBody: rawBody.length > 0,
      timestamp: new Date().toISOString(),
    });

    // Mercado Pago puede enviar notificaciones en dos formatos:
    // 1. Query parameters (IPN): ?topic=payment&id=123456
    // 2. JSON body: { type: "payment", data: { id: "123456" } }
    
    let paymentId: string | null = null;
    let notificationType: string | null = null;
    let body: any = null;

    // Intentar leer de query parameters primero (formato IPN)
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");
    
    if (topic && id) {
      console.log("[webhook] IPN format detected", { topic, id });
      notificationType = topic;
      if (topic === "payment") {
        paymentId = id;
      }
    } else if (rawBody) {
      // Intentar parsear como JSON
      try {
        body = JSON.parse(rawBody);
        notificationType = body.type;
        
        if (body.type === "payment") {
          paymentId = body.data?.id || body.id;
        }
      } catch (parseError) {
        console.error("[webhook] Failed to parse JSON body", {
          error: parseError,
          rawBody: rawBody.substring(0, 500),
        });
        // No devolvemos error 400, devolvemos 200 para que MP no reintente
        return NextResponse.json({ received: true, error: "Invalid JSON format" });
      }
    }

    // Log inicial para debugging
    console.log("[webhook] Parsed notification", {
      type: notificationType,
      paymentId,
      action: body?.action,
      dataId: body?.data?.id,
      data: body?.data,
      fullBody: body ? JSON.stringify(body).substring(0, 1000) : "N/A",
      timestamp: new Date().toISOString(),
    });

    // Mercado Pago puede enviar diferentes tipos de notificaciones
    // Tipo "payment" es el más común
    if (notificationType === "payment") {
      if (!paymentId) {
        console.warn("[webhook] Payment notification received but missing payment id", {
          body,
          queryParams: Object.fromEntries(url.searchParams.entries()),
        });
        // Devolvemos 200 para que MP no reintente, pero no podemos procesar sin paymentId
        return NextResponse.json({ 
          received: true, 
          warning: "Missing payment id",
        });
      }

      console.log("[webhook] Processing payment notification", { paymentId });

      // Consultar el pago a Mercado Pago para obtener detalles completos
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      if (!accessToken) {
        console.error("[webhook] Missing MERCADOPAGO_ACCESS_TOKEN");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
      }

      console.log("[webhook] Fetching payment details from Mercado Pago", { paymentId });
      const mpRes = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!mpRes.ok) {
        const errorText = await mpRes.text();
        console.error("[webhook] Failed to fetch payment from MP", {
          status: mpRes.status,
          statusText: mpRes.statusText,
          paymentId,
          error: errorText,
        });
        return NextResponse.json({ error: "Failed to fetch payment" }, { status: 502 });
      }

      const payment = await mpRes.json();
      const preferenceId = payment.preference_id;
      const mpStatus = payment.status; // approved, pending, rejected, etc.

      console.log("[webhook] Payment details from MP", {
        paymentId,
        preferenceId,
        mpStatus,
        paymentKeys: Object.keys(payment),
      });

      if (!preferenceId) {
        console.warn("[webhook] Missing preference_id in payment", { 
          paymentId, 
          paymentKeys: Object.keys(payment),
          payment: JSON.stringify(payment).substring(0, 500),
        });
        // No devolvemos error 400, devolvemos 200 para que MP sepa que recibimos la notificación
        // pero no podemos procesarla sin preference_id
        return NextResponse.json({ 
          received: true, 
          warning: "Missing preference_id",
          paymentId,
        });
      }

      // Buscar la orden por preferenceId
      console.log("[webhook] Searching order by preferenceId", { preferenceId });
      let order = await findOrderByPreferenceId(preferenceId);

      // Si no la encontramos por preferenceId, intentar por paymentId
      if (!order) {
        console.log("[webhook] Order not found by preferenceId, trying paymentId", { paymentId });
        order = await findOrderByPaymentId(paymentId);
      }

      if (!order) {
        console.warn("[webhook] Order not found in database", { 
          preferenceId, 
          paymentId,
          suggestion: "Check if the order was created correctly in create-preference route",
        });
        // No retornamos error porque puede ser un pago de otra fuente
        return NextResponse.json({ 
          received: true, 
          orderNotFound: true,
          preferenceId,
          paymentId,
        });
      }

      console.log("[webhook] Order found", {
        orderId: order.orderId,
        currentStatus: order.status,
        preferenceId,
        paymentId,
      });

      // Mapear estado de MP a nuestro estado
      let orderStatus: "pending" | "approved" | "rejected" | "cancelled" | "refunded" = "pending";
      if (mpStatus === "approved") {
        orderStatus = "approved";
      } else if (mpStatus === "rejected" || mpStatus === "cancelled") {
        orderStatus = "rejected";
      } else if (mpStatus === "refunded") {
        orderStatus = "refunded";
      }

      console.log("[webhook] Updating order status", {
        orderId: order.orderId,
        oldStatus: order.status,
        newStatus: orderStatus,
        mpStatus,
      });

      // Actualizar la orden
      const updateResult = await updateOrderStatus(order.orderId, orderStatus, paymentId, mpStatus);

      console.log("[webhook] Order update result", {
        orderId: order.orderId,
        paymentId,
        status: orderStatus,
        mpStatus,
        updateSuccess: updateResult,
      });

      return NextResponse.json({ 
        received: true, 
        orderId: order.orderId, 
        status: orderStatus,
        updateSuccess: updateResult,
      });
    }

    // Otros tipos de notificaciones (preference, merchant_order, etc.)
    console.log("[webhook] Received non-payment notification", {
      type: notificationType,
      action: body?.action,
      data: body?.data,
    });
    
    // Siempre devolvemos 200 para que Mercado Pago sepa que recibimos la notificación
    // incluso si no la procesamos
    return NextResponse.json({ 
      received: true, 
      type: notificationType,
      message: "Notification received but not processed",
    });
  } catch (error) {
    console.error("[webhook] Error processing webhook", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET para verificar que el endpoint existe (Mercado Pago puede hacer un GET primero)
export async function GET() {
  return NextResponse.json({ message: "Mercado Pago webhook endpoint" });
}






