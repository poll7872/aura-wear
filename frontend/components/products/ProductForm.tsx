import { CategoriesReponseSchema, Product } from "@/src/schemas";
import { UploadProductImage } from "./UploadProductImage";

async function getCategories() {
  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url);
  const json = await req.json();

  const categories = CategoriesReponseSchema.parse(json);
  return categories;
}

export default async function ProductForm({ product }: { product?: Product }) {
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Nombre Producto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre Producto"
          className="w-full rounded-xl border border-border/70 bg-card px-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
          name="name"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="price"
          className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Precio
        </label>
        <input
          id="price"
          type="number"
          placeholder="Precio Producto"
          className="w-full rounded-xl border border-border/70 bg-card px-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
          name="price"
          min={0}
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="inventory"
          className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Inventario
        </label>
        <input
          id="inventory"
          type="number"
          placeholder="Cantidad Disponible"
          className="w-full rounded-xl border border-border/70 bg-card px-3 py-2.5 text-foreground shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
          name="inventory"
          min={0}
          defaultValue={product?.inventory}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="categoryId"
          className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground"
        >
          Categoría
        </label>
        <select
          id="categoryId"
          className="w-full rounded-xl border border-border/70 bg-card px-3 py-2.5 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <UploadProductImage currentImage={product?.image} />
    </>
  );
}
