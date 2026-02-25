"use client";

import { useStore } from "@/src/store";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { Amount } from "./Amount";
import { CouponForm } from "./CouponForm";
import { SubmitOrderForm } from "./SubmitOrderForm";

export const ShoppingCart = () => {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);
  const closeCart = useStore((state) => state.closeCart);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-foreground">Resumen de venta</h2>
        <button
          type="button"
          className="rounded-full p-1 text-muted-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
          onClick={closeCart}
        >
          <span className="sr-only">Close cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {contents.length ? (
        <>
          <ul
            role="list"
            className="mt-6 divide-y divide-border border-t border-border text-sm font-medium"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="space-y-4 border-t border-border py-6 text-sm font-medium">
            {discount ? (
              <Amount label="Descuento" discount={true} amount={discount} />
            ) : null}
            <Amount label="Total a pagar" amount={total} />
          </dl>

          <CouponForm />
          <SubmitOrderForm />
        </>
      ) : (
        <p className="text-xl text-center text-muted-foreground pt-20">
          Tu carrito de compras está vacío.
        </p>
      )}
    </>
  );
};
