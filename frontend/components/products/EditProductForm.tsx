"use client";

import { updateProduct } from "@/actions/update-product-action";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { sileo } from "sileo";

export const EdiProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const updateProductWithId = updateProduct.bind(null, +id);
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) =>
        sileo.error({
          title: "Algo salio mal!",
          description: error,
          styles: { description: "text-black" },
        }),
      );
    }

    if (state.success) {
      sileo.success({
        title: "Guardado",
        description: state.success,
        styles: { description: "text-black" },
      });
      router.push("/admin/products");
    }
  }, [state]);

  return (
    <form className="space-y-5" action={dispatch}>
      {children}
      <input
        type="submit"
        className="w-full cursor-pointer rounded-xl border border-primary/35 bg-primary py-3 text-sm font-black uppercase tracking-[0.12em] text-primary-foreground shadow-[0_10px_24px_hsl(var(--primary)/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_14px_30px_hsl(var(--primary)/0.42)]"
        value="Guardar Cambios"
      />
    </form>
  );
};
