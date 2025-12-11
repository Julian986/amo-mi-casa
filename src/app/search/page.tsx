import ProductCard from "@/components/site/ProductCard";
import { products } from "@/data/products";
import ScrollToTop from "@/components/site/ScrollToTop";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = sp.q;
  const q = Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";
  const qTrim = q.toString().trim();
  const qLower = qTrim.toLowerCase();
  const results = qTrim
    ? products.filter((p) => p.name.toLowerCase().includes(qLower))
    : products;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <ScrollToTop />
      <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">
        {qTrim ? `Resultados para “${qTrim}”` : "Todos los productos"}
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {results.length > 0 ? (
          results.map((p) => <ProductCard key={p.id} {...p} />)
        ) : (
          <div className="col-span-full rounded-lg border border-stone-200 bg-white p-6 text-stone-700">
            No encontramos resultados. Probá con otro término.
          </div>
        )}
      </div>
    </div>
  );
}


