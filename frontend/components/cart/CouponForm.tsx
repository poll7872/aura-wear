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
      <p className="py-4 font-bold border-t border-border text-foreground">
        Canjear Cupón
      </p>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2 bg-secondary border border-border w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Ingresa un cupón"
          name="coupon_name"
        />
        <input
          type="submit"
          className="p-3 bg-primary text-primary-foreground font-bold hover:bg-primary/90 cursor-pointer rounded-r-md"
          value="Canjear"
        />
      </form>

      {coupon.message ? (
        <p className="py-4 text-center text-sm font-bold text-muted-foreground">
          {coupon.message}
        </p>
      ) : null}
    </>
  );
};

