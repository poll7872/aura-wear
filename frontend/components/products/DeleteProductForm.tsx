import { Product } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export const DeleteProductForm = ({
  productId,
}: {
  productId: Product["id"];
}) => {
  const handleDeleteProduct = async () => {
    "use server";
    const url = `${process.env.API_URL}/products/${productId}`;
    const req = await fetch(url, {
      method: "DELETE",
    });
    await req.json();
    revalidatePath("/admin/products");
  };

  return (
    <form action={handleDeleteProduct}>
      <input
        type="submit"
        className="cursor-pointer rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-destructive transition-all duration-200 hover:-translate-y-0.5 hover:bg-destructive/20"
        value="Eliminar"
      />
    </form>
  );
};
