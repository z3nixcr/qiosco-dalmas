"use client";

import { updateProduct } from "@/actions/update-product";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const productId = +params.id!;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await updateProduct(
      result.data,
      productId
    );
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    toast.success("Producto actualizado correctamente");
    router.push("/admin/products");
    // router.refresh();
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-4">
        {children}

        <input
          type="submit"
          value="Guardar Cambios"
          className="duration-300 bg-indigo-800 text-white w-full mt-5 p-3 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer uppercase font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
        />
      </form>
    </div>
  );
}
