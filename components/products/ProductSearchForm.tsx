"use client";

import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);
    // console.log(result);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    router.push(
      `/admin/products/search?query=${result.data.search.trim()}`
    );
  };

  return (
    <form
      action={handleSearchForm}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        name="search"
        placeholder="Buscar producto..."
        className="border border-gray-300 bg-white rounded-md p-2 w-full"
      />
      <input
        type="submit"
        value="Buscar"
        className="transition-colors duration-300 bg-indigo-400 hover:bg-indigo-600 p-2 rounded-md uppercase text-white cursor-pointer"
      />
    </form>
  );
}
