import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { DeleteProductForm } from "./DeleteProductForm";

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="mt-8 px-0 sm:px-0 lg:px-0">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_14px_34px_hsl(var(--foreground)/0.1)]">
              <table className="min-w-full divide-y divide-border/80">
              <thead>
                <tr className="bg-muted/35">
                  <th
                    scope="col"
                    className="py-4 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground sm:pl-6"
                  >
                    Imagen
                  </th>

                  <th
                    scope="col"
                    className="py-4 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-left text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    Inventario
                  </th>
                  <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-card">
                {products.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-muted/20">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground sm:pl-6">
                      <Image
                        src={getImagePath(product.image)}
                        alt={`Imagen del producto ${product.name}`}
                        width={120}
                        height={120}
                        className="h-20 w-20 rounded-xl border border-border/70 object-cover shadow-sm"
                        unoptimized
                        priority
                      />
                    </td>
                    <td className="py-4 pl-4 pr-3 text-sm font-bold text-foreground sm:pl-0">
                      {product.name}
                    </td>
                    <td className="px-3 py-4 text-sm font-semibold text-foreground">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-3 py-4 text-sm text-muted-foreground">
                      {isAvailable(product.inventory) ? (
                        <span className="rounded-full border border-constructive/25 bg-constructive/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-constructive">
                          {product.inventory} disponibles
                        </span>
                      ) : (
                        <p className="rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-center text-xs font-bold uppercase tracking-wide text-destructive">
                          Agotado
                        </p>
                      )}
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          className="rounded-full border border-border/80 bg-muted/35 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                          href={`/admin/products/${product.id}/edit`}
                        >
                          Editar{" "}
                          <span className="sr-only">, {product.name}</span>
                        </Link>
                        <DeleteProductForm productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
