import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/site/BackButton";
import PaymentMethods from "@/components/site/PaymentMethods";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} | Amo mi casa`,
    description: `Compra ${product.name} en Amo mi casa.`,
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
            style={product.objectPosition ? { objectPosition: product.objectPosition } : undefined}
            priority
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-stone-900">{product.name}</h1>
          <div className="text-xl font-semibold text-stone-900">
            {typeof product.price === "number" ? formatCurrency(product.price) : "$"}
          </div>
          {product.description && (
            <div className="text-sm text-stone-700 leading-relaxed">
              {product.description}
            </div>
          )}

          {(product.colors || product.sizes) && (
            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-stone-900">Colores</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-xs text-stone-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-stone-900">Medidas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-xs text-stone-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button className="h-11 px-6 cursor-pointer">Agregar al carrito</Button>
            <Button className="h-11 px-6 cursor-pointer" variant="secondary">
              Consultar
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PaymentMethods />
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-stone-900">Envíos y cambios</h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                <li>Envíos a todo el país. Calcular en el checkout.</li>
                <li>Cambios dentro de 10 días con ticket o factura.</li>
                <li>Retiro sin cargo por el local.</li>
              </ul>
            </div>
          </div>
        </div>
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


