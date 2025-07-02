import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/src/lib/prisma";

async function searchProducts(query: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  const products = await searchProducts(query);
  //   console.log({ products });

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4">
        <Heading>
          Resultados de la búsqueda: {query}
        </Heading>
        <ProductSearchForm />
      </div>
      {products.length > 0 ? (
        <ProductsTable products={products} />
      ) : (
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            No se encontraron productos.
          </p>
        </div>
      )}
    </>
  );
}
