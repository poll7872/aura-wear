"use client";

import { useStore } from "@/src/store";
import { ShoppingCart } from "./ShoppingCart";

export const CartManager = () => {
  const isCartOpen = useStore((state) => state.isCartOpen);
  const closeCart = useStore((state) => state.closeCart);

  return (
    <>
      {/* Cart Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-200"
          onClick={closeCart}
        ></div>
      )}

      {/* Shopping Cart */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full transform border-l border-border/70 bg-card/95 p-5 shadow-[-12px_0_40px_hsl(var(--foreground)/0.2)] backdrop-blur-md transition-transform duration-300 ease-in-out md:w-[26rem] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto rounded-2xl border border-border/50 bg-background/85 p-4">
          <ShoppingCart />
        </div>
      </aside>
    </>
  );
};
