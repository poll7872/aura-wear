import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Image from "next/image";
import { AddProductButton } from "./AddProductButton";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_10px_24px_hsl(var(--foreground)/0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_38px_hsl(var(--foreground)/0.14)]">
      {/* Image Section */}
      <div
        className={`${!isAvailable(product.inventory) && "opacity-50"} relative aspect-4/5 overflow-hidden bg-muted/20`}
      >
        <Image
          src={getImagePath(product.image)}
          alt={`Imagen del producto ${product.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        {/* Add button appears over the image */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {isAvailable(product.inventory) ? (
            <AddProductButton product={product} />
          ) : (
            <p className="rounded-full border border-destructive/40 bg-destructive/20 px-4 py-1.5 text-sm font-black uppercase tracking-[0.14em] text-white">
              Agotado
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-extrabold tracking-tight text-foreground">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-black text-primary">
            {formatCurrency(product.price)}
          </p>
          <p className="rounded-full border border-border/70 bg-muted/35 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.inventory} Disponibles
          </p>
        </div>
      </div>
    </div>
  );
};
