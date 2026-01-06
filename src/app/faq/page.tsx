import ScrollToTop from "@/components/site/ScrollToTop";

export default function FAQPage() {
  const faqs = [
    {
      q: "¿Cuáles son los medios de pago?",
      a: "Aceptamos Mercado Pago (tarjeta o billetera, 1 pago).",
    },
    {
      q: "¿Hacen envíos? ¿Cuánto tardan?",
      a: "Sí, realizamos envíos a todo el país. El envío se coordina luego de la compra. A Mar del Plata el envío es gratis.",
    },
    {
      q: "¿Cómo coordino el retiro por el local?",
      a: "Seleccioná “Retiro por el local” al finalizar la compra. Te avisaremos cuando esté listo para retirar.",
    },
    {
      q: "¿Puedo cambiar o devolver un producto?",
      a: "Los cambios se realizan solo en Mar del Plata. Tenés 10 días corridos para hacer cambios presentando ticket/factura. El producto debe estar en perfectas condiciones.",
    },
    {
      q: "¿Cómo calculo el costo de envío?",
      a: "El costo de envío se coordina luego de la compra. Si tu dirección es en Mar del Plata, el envío es gratis.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <ScrollToTop />
      <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">Preguntas Frecuentes</h1>
      <div className="mt-6 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
        {faqs.map((item, idx) => (
          <details key={idx} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-stone-900 hover:bg-stone-50">
              <span className="text-sm md:text-base font-medium">{item.q}</span>
              <span className="ml-4 inline-flex h-5 w-5 items-center justify-center rounded-full border border-stone-300 text-stone-600 leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-4 pb-4 text-sm text-stone-700">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}


