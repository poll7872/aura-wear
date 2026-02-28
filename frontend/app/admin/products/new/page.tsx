import { AddProductForm } from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

export default function newProductPage() {
  return (
    <>
      <Link
        href="/admin/products?page=1"
        className="inline-flex rounded-xl border border-border/80 bg-muted/35 px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
      >
        Volver
      </Link>
      <Heading>Nuevo Producto</Heading>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
