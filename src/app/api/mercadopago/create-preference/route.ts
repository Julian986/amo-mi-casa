import { NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { createOrder } from "@/lib/orders";
import type { OrderItem, OrderCustomer } from "@/lib/types/order";

type Body = {
  items: Array<{ id: string; quantity: number }>;
  payer?: {
    email?: string;
    name?: string;
    phone?: string;
  };
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    postalCode?: string;
    notes?: string;
  };
};

export async function POST(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Missing MERCADOPAGO_ACCESS_TOKEN" },
      { status: 500 }
    );
  }

  const requestOrigin = new URL(request.url).origin;
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || requestOrigin).replace(/\/$/, "");

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Missing items" }, { status: 400 });
  }

  const preferenceItems: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    currency_id: "ARS";
  }> = [];

  for (const line of body.items) {
    const qty = Number(line.quantity);
    if (!line.id || !Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json(
        { error: "Invalid item in cart" },
        { status: 400 }
      );
    }

    const product = getProductById(line.id);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product id: ${line.id}` },
        { status: 400 }
      );
    }

    if (typeof product.price !== "number") {
      return NextResponse.json(
        { error: `Product has no price: ${line.id}` },
        { status: 400 }
      );
    }

    preferenceItems.push({
      title: product.name,
      quantity: qty,
      unit_price: product.price,
      currency_id: "ARS",
    });
  }

  // Calcular totales
  const subtotal = preferenceItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const total = subtotal; // Por ahora sin descuento (se puede agregar después)

  const payload: Record<string, unknown> = {
    items: preferenceItems,
    back_urls: {
      success: `${baseUrl}/checkout/success`,
      pending: `${baseUrl}/checkout/pending`,
      failure: `${baseUrl}/checkout/failure`,
    },
    notification_url: `${baseUrl}/api/mercadopago/webhook`, // Webhook para recibir notificaciones
  };

  // Datos del comprador (opcionales)
  const payerEmail = body?.payer?.email?.trim() || body?.customer?.email?.trim();
  if (payerEmail) {
    payload.payer = { email: payerEmail };
  }

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const raw = await mpRes.text();
  if (!mpRes.ok) {
    // Logueamos el error completo en el server para debug (sin imprimir el token).
    console.error("[mercadopago] create preference failed", {
      status: mpRes.status,
      statusText: mpRes.statusText,
      body: raw,
    });
    return NextResponse.json(
      {
        error: "Mercado Pago API error",
        mp_status: mpRes.status,
        mp_statusText: mpRes.statusText,
        details: raw,
      },
      { status: 502 }
    );
  }

  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Unexpected Mercado Pago response", details: raw },
      { status: 502 }
    );
  }

  const useSandbox =
    String(process.env.MERCADOPAGO_USE_SANDBOX || "false").toLowerCase() ===
    "true";
  const redirectUrl = useSandbox
    ? data?.sandbox_init_point || data?.init_point
    : data?.init_point || data?.sandbox_init_point;

  if (!redirectUrl) {
    return NextResponse.json(
      { error: "Missing init_point from Mercado Pago", details: data },
      { status: 502 }
    );
  }

  // Guardar orden en la base de datos (solo si tenemos MongoDB configurado)
  try {
    const preferenceId = data?.id;
    if (preferenceId && process.env.MONGODB_URI) {
      const orderItems: OrderItem[] = preferenceItems.map((item, idx) => {
        const product = getProductById(body.items[idx]?.id);
        return {
          id: body.items[idx]?.id || "",
          name: item.title,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          image: product?.image,
        };
      });

      const customer: OrderCustomer = {
        fullName: body.customer?.fullName || body.payer?.name,
        email: body.customer?.email || body.payer?.email,
        phone: body.customer?.phone || body.payer?.phone,
        address: body.customer?.address,
        postalCode: body.customer?.postalCode,
      };

      await createOrder({
        items: orderItems,
        subtotal,
        total,
        customer,
        paymentMethod: "mercadopago",
        preferenceId,
        notes: body.customer?.notes,
      });

      console.log("[mercadopago] Order created for preference", preferenceId);
    }
  } catch (error) {
    // No fallar si MongoDB no está configurado o hay un error
    console.error("[mercadopago] Failed to save order (non-critical)", error);
  }

  return NextResponse.json({
    id: data?.id,
    init_point: data?.init_point,
    sandbox_init_point: data?.sandbox_init_point,
    redirectUrl,
  });
}


