import { menuCategories, menuProducts } from "@/data/menu";
import { ProductCard } from "@/components/ui/ProductCard";
import { CartDrawer } from "@/components/ui/CartDrawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          Gastro Experience
        </p>

        <h1 className="mt-4 max-w-3xl text-5xl font-medium tracking-tight md:text-7xl">
          Una experiencia gastronómica pensada para vender.
        </h1>

        <div className="mt-16 space-y-16">
          {menuCategories.map((category) => {
            const products = menuProducts.filter(
              (product) =>
                product.categoryId === category.id,
            );

            if (!products.length) return null;

            return (
              <section key={category.id}>
                <h2 className="mb-6 text-2xl">
                  {category.name}
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <CartDrawer />
    </main>
  );
}