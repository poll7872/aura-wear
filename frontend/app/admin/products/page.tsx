import ProductsTable from "@/components/products/ProductsTable";
import { Heading } from "@/components/ui/Heading";
import { Pagination } from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  const req = await fetch(url);
  const json = await req.json();

  const data = ProductsResponseSchema.parse(json);
  return {
    products: data.products,
    total: data.total,
  };
}

type SearchParams = Promise<{ page: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  if (!isValidPage(+page)) redirect("/admin/products?page=1");

  const productsPerPage = 10;
  const skip = (+page - 1) * productsPerPage;
  console.log(skip);

  const { products, total } = await getProducts(productsPerPage, skip);

  const totalPages = Math.ceil(total / productsPerPage);
  if (+page > totalPages) redirect("/admin/products?page=1");

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
        <Link
          href="/admin/products/new"
          className="inline-flex rounded-xl border border-primary/35 bg-primary px-5 py-2.5 text-sm font-black uppercase tracking-[0.1em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_30px_hsl(var(--primary)/0.42)]"
        >
          Nuevo Producto
        </Link>
      </div>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products} />

      <Pagination
        page={+page}
        totalPages={totalPages}
        baseUrl="/admin/products"
      />
    </>
  );
}
