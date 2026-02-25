"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store";

export const AddProductButton = ({ product }: { product: Product }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <button
      type="button"
      className="transform rounded-full bg-primary p-3 text-primary-foreground transition-all duration-300 scale-90 group-hover:scale-100 hover:!scale-110"
      onClick={() => addToCart(product)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};
