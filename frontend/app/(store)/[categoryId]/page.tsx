import { ProductCard } from "@/components/products/ProductCard";
import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import { redirect } from "next/navigation";

type Params = Promise<{ categoryId: string }>;

async function getProducts(categoryId: string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;
  const req = await fetch(url, {
    next: {
      tags: ["products-by-category"],
    },
  });
  const json = await req.json();
  if (!req.ok) {
    redirect("/1");
  }
  const products = CategoryWithProductsResponseSchema.parse(json);
  return products;
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/80 px-5 py-4 shadow-[0_10px_24px_hsl(var(--foreground)/0.08)] backdrop-blur-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Categoria activa
          </p>
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            {category.name}
          </h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
          {category.products.length} productos
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.products.map((product) => (
          <div
            key={product.id}
            className="group rounded-2xl border border-transparent bg-gradient-to-b from-card to-muted/25 p-1 shadow-[0_12px_28px_hsl(var(--foreground)/0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_36px_hsl(var(--foreground)/0.14)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
