"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const CHECKOUT_DRAFT_KEY = "amc_checkout_draft_v1";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [draftHydrated, setDraftHydrated] = useState(false);
  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Scroll suave hacia arriba al montar la página
  useEffect(() => {
    // Usar requestAnimationFrame para asegurar que se ejecute después del render
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  // Restaurar borrador de checkout al montar (para que no se pierdan los datos al ir al carrito y volver).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<{
        fullName: string;
        phone: string;
        email: string;
        address: string;
        postalCode: string;
        notes: string;
      }>;
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
  }, [draftHydrated, fullName, phone, email, address, postalCode, notes]);

  // Validar teléfono (formato argentino: acepta números con o sin espacios, guiones, paréntesis)
  const isValidPhone = (phoneValue: string): boolean => {
    // Eliminar espacios, guiones, paréntesis y otros caracteres no numéricos
    const digitsOnly = phoneValue.replace(/\D/g, "");
    // Debe tener entre 8 y 15 dígitos (formato argentino)
    return digitsOnly.length >= 8 && digitsOnly.length <= 15;
  };

  // Validar formulario
  const isFormValid = (): boolean => {
    const nameValid = fullName.trim().length > 0;
    const phoneValid = isValidPhone(phone);
    const addressValid = address.trim().length > 0;
    const emailValid = isValidEmail(email);
    return nameValid && phoneValid && addressValid && emailValid;
  };

  const isMarDelPlataAddress = isMarDelPlata(address);

  // Validar nombre
  const handleNameChange = (value: string) => {
    setFullName(value);
    if (value.trim().length === 0) {
      setNameError("El nombre es obligatorio");
    } else {
      setNameError(null);
    }
  };

  // Validar teléfono
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value.trim().length === 0) {
      setPhoneError("El teléfono es obligatorio");
    } else if (!isValidPhone(value)) {
      setPhoneError("Ingresá un número de teléfono válido");
    } else {
      setPhoneError(null);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    if (value.trim().length === 0) {
      setAddressError("La dirección es obligatoria");
    } else {
      setAddressError(null);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError("Ingresá un email válido");
    } else {
      setEmailError(null);
    }
  };

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
            El envío se coordina luego de la compra. Envío gratis a Mar del Plata.
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
                <Label htmlFor="fullName">
                  Nombre y apellido <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Tu nombre"
                  className={nameError ? "border-red-500" : ""}
                  required
                />
                {nameError && (
                  <p className="text-xs text-red-600">{nameError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  WhatsApp / Teléfono <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Ej: 11 5056 2136"
                  className={phoneError ? "border-red-500" : ""}
                  required
                />
                {phoneError && (
                  <p className="text-xs text-red-600">{phoneError}</p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">
                  Dirección <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  placeholder="Calle, número, piso/depto, localidad"
                  className={addressError ? "border-red-500" : ""}
                  required
                />
                {addressError && (
                  <p className="text-xs text-red-600">{addressError}</p>
                )}
                {address.trim().length > 0 && (
                  <p className="text-xs text-stone-600">
                    {isMarDelPlataAddress
                      ? "Envío gratis a Mar del Plata."
                      : "Tip: si tu dirección es en Mar del Plata, el envío es gratis."}
                  </p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">
                  Email <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="tu@email.com"
                  className={emailError ? "border-red-500" : ""}
                  required
                />
                {emailError && (
                  <p className="text-xs text-red-600">{emailError}</p>
                )}
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
        </div>

        <aside className="rounded-lg border border-stone-200 bg-white p-4 h-fit">
          <h2 className="text-sm font-semibold text-stone-900">Resumen</h2>
          <div className="mt-3 space-y-2 text-sm text-stone-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Envío</span>
              <span className="font-medium">
                {isMarDelPlataAddress ? "Gratis" : "A coordinar"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-2">
              <span className="text-stone-900 font-semibold">Total</span>
              <span className="text-stone-900 font-semibold">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Button
              className="w-full cursor-pointer"
              onClick={async () => {
                // Validar antes de proceder
                if (!fullName.trim()) {
                  setNameError("El nombre es obligatorio");
                  return;
                }
                if (!phone.trim()) {
                  setPhoneError("El teléfono es obligatorio");
                  return;
                }
                if (!isValidPhone(phone)) {
                  setPhoneError("Ingresá un número de teléfono válido");
                  return;
                }
                if (!address.trim()) {
                  setAddressError("La dirección es obligatoria");
                  return;
                }
                if (!isValidEmail(email)) {
                  setEmailError("Ingresá un email válido");
                  return;
                }

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
              disabled={mpLoading || !isFormValid()}
            >
              {mpLoading ? "Redirigiendo a Mercado Pago..." : "Pagar"}
            </Button>
            {mpError && (
              <p className="text-xs text-red-600">
                {mpError}. Revisá que tengas configurado <code className="rounded bg-white px-1 py-0.5">MERCADOPAGO_ACCESS_TOKEN</code>.
              </p>
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
              El envío se coordina luego de la compra. Envío gratis a Mar del Plata.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function isMarDelPlata(address: string): boolean {
  if (!address) return false;
  const normalized = address
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalized.includes("mar del plata");
}

function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Validación simple (suficiente para UI) evitando falsos positivos comunes.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}


