import { useStore } from "@/src/store";
import { ChangeEvent } from "react";

export const CouponForm = () => {
  const applyCoupon = useStore((state) => state.applyCoupon);
  const coupon = useStore((state) => state.coupon);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const couponName = formData.get("coupon_name")?.toString()!;
    if (!couponName.length) return;
    await applyCoupon(couponName);
  };

  return (
    <>
      <p className="mb-3 border-b border-border/60 pb-3 text-sm font-black uppercase tracking-[0.14em] text-foreground">
        Canjear Cupón
      </p>
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded-lg border border-border/70 bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ingresa un cupón"
          name="coupon_name"
        />
        <input
          type="submit"
          className="cursor-pointer rounded-lg border border-primary/40 bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_18px_hsl(var(--primary)/0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
          value="Canjear"
        />
      </form>

      {coupon.message ? (
        <p className="pt-3 text-center text-sm font-semibold text-muted-foreground">
          {coupon.message}
        </p>
      ) : null}
    </>
  );
};
