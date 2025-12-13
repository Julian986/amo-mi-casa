import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollToProductsButton from "@/components/site/ScrollToProductsButton";
import HomeCTAButtons from "@/components/site/HomeCTAButtons";
import ProductCard from "@/components/site/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="font-sans">
      <main>
        <section className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="order-2 md:order-1 flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 leading-tight">
                  Descubrí lo último en Home & Deco
                </h1>
                <p className="mt-3 text-stone-700">
                  Textiles, decoración, cocina, aromas e iluminación para transformar tu hogar.
                </p>
                <HomeCTAButtons />
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                  <Image
                    src="https://res.cloudinary.com/dzoupwn0e/image/upload/v1765465731/portada_wodgac.webp"
                    alt="Portada Amo mi casa"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="productos" className="mx-auto max-w-7xl px-4 py-10 scroll-mt-32 md:scroll-mt-40">
          <h2 className="text-2xl md:text-3xl font-semibold text-stone-900">Productos destacados</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p, idx) => {
              let addButtonStyle: React.CSSProperties | undefined = undefined;
              if (idx === 0 || idx === 1) {
                addButtonStyle = { background: "#fde9e9", color: "#7f6938" };
              } else if (idx === 2 || idx === 3) {
                addButtonStyle = { background: "#7f6939", color: "#fde9e9" };
              }
              return <ProductCard key={p.id} {...p} addButtonStyle={addButtonStyle} />;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

// Productos ahora se importan desde "@/data/products"
