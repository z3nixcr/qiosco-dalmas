import prisma from "@/src/lib/prisma";
import { Product } from "../../app/generated/prisma/index";
import ImageUpload from "./ImageUpload";

async function fetchCategories() {
  return await prisma.category.findMany();
}

type ProductFormProps = {
  product?: Product;
};

export default async function ProductForm({
  product,
}: ProductFormProps) {
  const categories = await fetchCategories();
  //   console.log({ categories });

  return (
    <>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100 rounded-md"
          placeholder="Nombre Producto"
          defaultValue={product?.name || ""}
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100 rounded-md"
          placeholder="Precio Producto"
          defaultValue={product?.price || ""}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-slate-800"
          htmlFor="categoryId"
        >
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100 rounded-md"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId || ""}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ImageUpload image={product?.image} />
    </>
  );
}
