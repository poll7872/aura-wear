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
        className="rounded bg-green-400 py-2 w-full font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
};
