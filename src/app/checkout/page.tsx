"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TRANSFER_BANK_DETAILS,
  TRANSFER_DISCOUNT_PERCENT,
  WHATSAPP_PHONE,
} from "@/lib/constants";

type PaymentMethod = "transfer" | "mercadopago";

const CHECKOUT_DRAFT_KEY = "amc_checkout_draft_v1";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [draftHydrated, setDraftHydrated] = useState(false);
  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState<string | null>(null);

  // Restaurar borrador de checkout al montar (para que no se pierdan los datos al ir al carrito y volver).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<{
        paymentMethod: PaymentMethod;
        fullName: string;
        phone: string;
        email: string;
        address: string;
        postalCode: string;
        notes: string;
      }>;

      if (draft.paymentMethod) setPaymentMethod(draft.paymentMethod);
      if (typeof draft.fullName === "string") setFullName(draft.fullName);
      if (typeof draft.phone === "string") setPhone(draft.phone);
      if (typeof draft.email === "string") setEmail(draft.email);
      if (typeof draft.address === "string") setAddress(draft.address);
      if (typeof draft.postalCode === "string") setPostalCode(draft.postalCode);
      if (typeof draft.notes === "string") setNotes(draft.notes);
    } catch {
      // ignore
    } finally {
      // Importante: no persistir (y pisar con vacío) hasta haber intentado hidratar el borrador.
      setDraftHydrated(true);
    }
  }, []);

  // Persistir borrador a medida que el usuario completa el formulario.
  useEffect(() => {
    if (!draftHydrated) return;
    try {
      sessionStorage.setItem(
        CHECKOUT_DRAFT_KEY,
        JSON.stringify({
          paymentMethod,
          fullName,
          phone,
          email,
          address,
          postalCode,
          notes,
        })
      );
    } catch {
      // ignore
    }
  }, [draftHydrated, paymentMethod, fullName, phone, email, address, postalCode, notes]);

  const discountAmount = useMemo(() => {
    if (paymentMethod !== "transfer") return 0;
    return Math.round((total * TRANSFER_DISCOUNT_PERCENT) / 100);
  }, [paymentMethod, total]);

  const totalWithDiscount = Math.max(0, total - discountAmount);

  const waHref = useMemo(() => {
    const lines: string[] = [];
    lines.push("Hola! Quiero finalizar una compra.");
    lines.push("");
    lines.push("Pedido:");
    for (const item of items) {
      const unit = typeof item.price === "number" ? item.price : 0;
      lines.push(`- ${item.name} x${item.quantity} (${formatCurrency(unit)})`);
    }
    lines.push("");
    lines.push(`Subtotal: ${formatCurrency(total)}`);
    if (paymentMethod === "transfer") {
      lines.push(`Descuento transferencia (${TRANSFER_DISCOUNT_PERCENT}%): -${formatCurrency(discountAmount)}`);
      lines.push(`Total con descuento: ${formatCurrency(totalWithDiscount)}`);
    }
    lines.push("");
    lines.push("Datos para envio:");
    if (fullName) lines.push(`Nombre: ${fullName}`);
    if (phone) lines.push(`Teléfono: ${phone}`);
    if (email) lines.push(`Email: ${email}`);
    if (address) lines.push(`Dirección: ${address}`);
    if (postalCode) lines.push(`CP: ${postalCode}`);
    if (notes) lines.push(`Notas: ${notes}`);
    lines.push("");
    lines.push(`Medio de pago: ${paymentMethodLabel(paymentMethod)}`);
    if (paymentMethod === "transfer") {
      lines.push("Transferencia: ¿me pasás alias/CBU y el total final para transferir?");
    }

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  }, [
    items,
    total,
    paymentMethod,
    fullName,
    phone,
    email,
    address,
    postalCode,
    notes,
    discountAmount,
    totalWithDiscount,
  ]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
        <p className="mt-4 text-stone-700">Tu carrito está vacío.</p>
        <div className="mt-6">
          <Link className="underline" href="/">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Checkout</h1>
          <p className="mt-1 text-sm text-stone-600">
            Elegí tu medio de pago. El envío se coordina luego de la compra.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/cart" aria-label="Ir al carrito" title="Ir al carrito">
            <ShoppingCart className="h-4 w-4" />
            Carrito
          </Link>
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-stone-900">Datos</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre y apellido</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp / Teléfono</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 11 5056 2136"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email (opcional)</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Dirección (opcional)</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, número, piso/depto, localidad"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Código postal (opcional)</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Ej: 1414"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Color/modelo, aclaraciones, etc."
                />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-stone-900">Medio de pago</h2>
            <div className="mt-4 grid gap-3">
              <label className="flex items-center gap-2 text-sm text-stone-800">
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={paymentMethod === "transfer"}
                  onChange={() => setPaymentMethod("transfer")}
                />
                Transferencia / efectivo ({TRANSFER_DISCOUNT_PERCENT}% OFF)
              </label>
              <label className="flex items-center gap-2 text-sm text-stone-800">
                <input
                  type="radio"
                  name="payment"
                  value="mercadopago"
                  checked={paymentMethod === "mercadopago"}
                  onChange={() => setPaymentMethod("mercadopago")}
                />
                Mercado Pago
              </label>
            </div>

            {paymentMethod === "transfer" && (
              <div className="mt-4 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm text-stone-800">
                <div className="font-medium">Datos de transferencia</div>
                <div className="mt-2 grid gap-1">
                  <div>Titular: {TRANSFER_BANK_DETAILS.titular}</div>
                  <div>Banco: {TRANSFER_BANK_DETAILS.banco}</div>
                  <div>Alias: {TRANSFER_BANK_DETAILS.alias}</div>
                  <div>CBU: {TRANSFER_BANK_DETAILS.cbu}</div>
                  <div>CUIT: {TRANSFER_BANK_DETAILS.cuit}</div>
                </div>
                <div className="mt-2 text-xs text-stone-600">
                  Tip: completá estos datos en <code className="rounded bg-white px-1 py-0.5">src/lib/constants.ts</code>.
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="rounded-lg border border-stone-200 bg-white p-4 h-fit">
          <h2 className="text-sm font-semibold text-stone-900">Resumen</h2>
          <div className="mt-3 space-y-2 text-sm text-stone-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            {paymentMethod === "transfer" && (
              <>
                <div className="flex items-center justify-between">
                  <span>Descuento transferencia</span>
                  <span className="font-medium">-{formatCurrency(discountAmount)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-stone-200 pt-2">
                  <span className="text-stone-900 font-semibold">Total</span>
                  <span className="text-stone-900 font-semibold">{formatCurrency(totalWithDiscount)}</span>
                </div>
              </>
            )}
            {paymentMethod === "mercadopago" && (
              <div className="flex items-center justify-between border-t border-stone-200 pt-2">
                <span className="text-stone-900 font-semibold">Total</span>
                <span className="text-stone-900 font-semibold">{formatCurrency(total)}</span>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {paymentMethod === "transfer" ? (
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                <Button className="w-full cursor-pointer">
                  Enviar pedido por WhatsApp
                </Button>
              </a>
            ) : (
              <>
                <Button
                  className="w-full cursor-pointer"
                  onClick={async () => {
                    setMpError(null);
                    setMpLoading(true);
                    try {
                      const payload = {
                        items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
                        payer: {
                          email: email || undefined,
                          name: fullName || undefined,
                          phone: phone || undefined,
                        },
                        customer: {
                          fullName: fullName || undefined,
                          email: email || undefined,
                          phone: phone || undefined,
                          address: address || undefined,
                          postalCode: postalCode || undefined,
                          notes: notes || undefined,
                        },
                      };
                      const res = await fetch("/api/mercadopago/create-preference", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                      });
                      const data = await res.json().catch(() => null);
                      if (!res.ok) {
                        const details =
                          typeof data?.details === "string" ? data.details : "";
                        const mpStatus =
                          typeof data?.mp_status === "number" ? ` (MP ${data.mp_status})` : "";
                        throw new Error(
                          `${data?.error || "No se pudo crear la preferencia de pago"}${mpStatus}${
                            details ? `: ${details}` : ""
                          }`
                        );
                      }
                      const url = data?.redirectUrl as string | undefined;
                      if (!url) throw new Error("Mercado Pago no devolvió la URL de pago");
                      window.location.href = url;
                    } catch (e) {
                      setMpError(e instanceof Error ? e.message : "Error desconocido");
                    } finally {
                      setMpLoading(false);
                    }
                  }}
                  disabled={mpLoading}
                >
                  {mpLoading ? "Redirigiendo a Mercado Pago..." : "Pagar con Mercado Pago"}
                </Button>
                {mpError && (
                  <p className="text-xs text-red-600">
                    {mpError}. Revisá que tengas configurado <code className="rounded bg-white px-1 py-0.5">MERCADOPAGO_ACCESS_TOKEN</code>.
                  </p>
                )}
              </>
            )}
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => {
                clear();
                try {
                  sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
                } catch {
                  // ignore
                }
              }}
            >
              Vaciar carrito
            </Button>
            <p className="text-xs text-stone-600">
              El envío se coordina luego de la compra.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function paymentMethodLabel(method: PaymentMethod): string {
  switch (method) {
    case "transfer":
      return "Transferencia";
    case "mercadopago":
      return "Mercado Pago";
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}


