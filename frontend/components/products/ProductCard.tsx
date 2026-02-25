import { Product } from "@/src/schemas";
import { formatCurrency } from "@/src/utils";
import Image from "next/image";
import { AddProductButton } from "./AddProductButton";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40">
      {/* Image Section */}
      <div className="group relative aspect-[4/5] overflow-hidden">
        <Image
          src={`${process.env.API_URL}/img/${product.image}`}
          alt={`Imagen del producto ${product.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        {/* Add button appears over the image */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AddProductButton product={product} />
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-2 p-4">
        <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-extrabold text-primary">
            {formatCurrency(product.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.inventory} Disponibles
          </p>
        </div>
      </div>
    </div>
  );
};
