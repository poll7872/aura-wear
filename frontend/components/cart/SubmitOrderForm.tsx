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
        className="mt-5 w-full bg-primary hover:bg-primary/90 text-primary-foreground uppercase font-bold p-3 cursor-pointer rounded-md"
        value="Confirmar Compra"
      />
    </form>
  );
};
