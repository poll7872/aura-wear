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
      <div className="mb-4 flex items-center justify-between rounded-xl border border-border/60 bg-muted/35 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Punto de venta
          </p>
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Resumen de venta
          </h2>
        </div>
        <button
          type="button"
          className="rounded-full border border-transparent p-1 text-muted-foreground/70 transition-all duration-200 hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
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
            className="mt-6 divide-y divide-border rounded-xl border border-border/60 bg-background text-sm font-medium"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl className="mt-5 space-y-3 rounded-xl border border-border/60 bg-muted/25 p-4 text-sm font-medium">
            {discount ? (
              <Amount label="Descuento" discount={true} amount={discount} />
            ) : null}
            <Amount label="Total a pagar" amount={total} />
          </dl>

          <div className="mt-5 rounded-xl border border-border/60 bg-background px-4 py-3">
            <CouponForm />
          </div>
          <SubmitOrderForm />
        </>
      ) : (
        <p className="rounded-xl border border-dashed border-border/80 bg-muted/20 px-4 py-16 text-center text-xl text-muted-foreground">
          Tu carrito de compras está vacío.
        </p>
      )}
    </>
  );
};
