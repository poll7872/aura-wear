"use client";

import { addProduct } from "@/actions/add-product-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { sileo } from "sileo";

export const AddProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [state, dispatch] = useActionState(addProduct, {
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
        className="rounded bg-green-400 py-2 w-full font-bold cursor-pointer"
        value="Agregar Producto"
      />
    </form>
  );
};
