import { EdiProductForm } from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { Heading } from "@/components/ui/Heading";
import { ProductSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const url = `${process.env.API_URL}/products/${id}`;
  const req = await fetch(url);
  const json = await req.json();

  if (!req.ok) {
    notFound();
  }

  const product = ProductSchema.parse(json);
  return product;
}

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Link
        href="/admin/products?page=1"
        className="inline-flex rounded-xl border border-border/80 bg-muted/35 px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
      >
        Volver
      </Link>
      <Heading>Editar Producto: {product.name}</Heading>

      <EdiProductForm>
        <ProductForm product={product} />
      </EdiProductForm>
    </>
  );
}
