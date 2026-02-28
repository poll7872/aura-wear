import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-12 text-center">
      <Heading>Producto No Encontrado</Heading>
      <p className="text-muted-foreground">
        Tal vez quieras volver a{" "}
        <Link
          className="font-bold text-primary underline decoration-primary/40 underline-offset-4"
          href={"/admin/products?page=1"}
        >
          Productos
        </Link>
      </p>
    </div>
  );
}
