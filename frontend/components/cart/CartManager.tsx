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
          className="fixed inset-0 bg-black/60 z-40"
          onClick={closeCart}
        ></div>
      )}

      {/* Shopping Cart */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full transform transition-transform duration-300 ease-in-out md:w-96 p-5 bg-card ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto">
          <ShoppingCart />
        </div>
      </aside>
    </>
  );
};
