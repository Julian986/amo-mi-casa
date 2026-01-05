import ScrollToTop from "@/components/site/ScrollToTop";

export default function EnviosCambiosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <ScrollToTop />
      <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">
        Envíos y cambios
      </h1>

      <div className="mt-6 space-y-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-base font-semibold text-stone-900">Envíos</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            <li>
              Enviamos a todo el país. El costo y la modalidad se coordinan luego
              de la compra.
            </li>
            <li>
              <span className="font-medium text-stone-900">
                Envío gratis a Mar del Plata
              </span>
              .
            </li>
            <li>
              Retiro sin cargo por el local (te avisamos cuando esté listo).
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-base font-semibold text-stone-900">Cambios</h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-700">
            <li>
              <span className="font-medium text-stone-900">
                Cambios solo en Mar del Plata
              </span>
              : dentro de 10 días corridos con ticket o factura.
            </li>
            <li>El producto debe estar en perfectas condiciones.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}



