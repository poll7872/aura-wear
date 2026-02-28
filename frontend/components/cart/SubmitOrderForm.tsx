import { submitOrder } from "@/actions/submit-order-action";
import { useStore } from "@/src/store";
import { useActionState, useEffect } from "react";
import { sileo } from "sileo";

export const SubmitOrderForm = () => {
  const total = useStore((state) => state.total);
  const coupon = useStore((state) => state.coupon.name);
  const contents = useStore((state) => state.contents);
  const clearOrder = useStore((state) => state.clearOrder);
  const order = {
    total,
    coupon,
    contents,
  };

  const submitOrderWithData = submitOrder.bind(null, order);
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => sileo.error({ title: error.message }));
    }
    if (state.success) {
      sileo.success({ title: state.success });
      clearOrder();
    }
  }, [state, clearOrder]);

  return (
    <form action={dispatch}>
      <input
        type="submit"
        className="mt-5 w-full cursor-pointer rounded-xl border border-primary/35 bg-primary p-3 text-sm font-black uppercase tracking-[0.12em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_30px_hsl(var(--primary)/0.42)]"
        value="Confirmar Compra"
      />
    </form>
  );
};
