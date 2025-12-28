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
    const body = await request.json();

    // Log inicial para debugging
    console.log("[webhook] Received notification", {
      type: body.type,
      action: body.action,
      dataId: body.data?.id,
      timestamp: new Date().toISOString(),
    });

    // Mercado Pago puede enviar diferentes tipos de notificaciones
    // Tipo "payment" es el más común
    if (body.type === "payment") {
      const paymentId = body.data?.id;
      if (!paymentId) {
        return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
      }

      // Consultar el pago a Mercado Pago para obtener detalles completos
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      if (!accessToken) {
        console.error("[webhook] Missing MERCADOPAGO_ACCESS_TOKEN");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
      }

      const mpRes = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!mpRes.ok) {
        console.error("[webhook] Failed to fetch payment from MP", {
          status: mpRes.status,
          paymentId,
        });
        return NextResponse.json({ error: "Failed to fetch payment" }, { status: 502 });
      }

      const payment = await mpRes.json();
      const preferenceId = payment.preference_id;
      const mpStatus = payment.status; // approved, pending, rejected, etc.

      if (!preferenceId) {
        console.error("[webhook] Missing preference_id in payment", { paymentId });
        return NextResponse.json({ error: "Missing preference_id" }, { status: 400 });
      }

      // Buscar la orden por preferenceId
      let order = await findOrderByPreferenceId(preferenceId);

      // Si no la encontramos por preferenceId, intentar por paymentId
      if (!order) {
        order = await findOrderByPaymentId(paymentId);
      }

      if (!order) {
        console.warn("[webhook] Order not found", { preferenceId, paymentId });
        // No retornamos error porque puede ser un pago de otra fuente
        return NextResponse.json({ received: true, orderNotFound: true });
      }

      // Mapear estado de MP a nuestro estado
      let orderStatus: "pending" | "approved" | "rejected" | "cancelled" | "refunded" = "pending";
      if (mpStatus === "approved") {
        orderStatus = "approved";
      } else if (mpStatus === "rejected" || mpStatus === "cancelled") {
        orderStatus = "rejected";
      } else if (mpStatus === "refunded") {
        orderStatus = "refunded";
      }

      // Actualizar la orden
      await updateOrderStatus(order.orderId, orderStatus, paymentId, mpStatus);

      console.log("[webhook] Order updated", {
        orderId: order.orderId,
        paymentId,
        status: orderStatus,
        mpStatus,
      });

      return NextResponse.json({ received: true, orderId: order.orderId, status: orderStatus });
    }

    // Otros tipos de notificaciones (preference, etc.)
    return NextResponse.json({ received: true, type: body.type });
  } catch (error) {
    console.error("[webhook] Error processing webhook", error);
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






