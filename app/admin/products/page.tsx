import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productsCount() {
  return await prisma.product.count();
}

async function getProducts(
  page: number,
  pageSize: number = 10
) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductWithCategory = Awaited<
  ReturnType<typeof getProducts>
>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams.page
    ? parseInt(searchParams.page)
    : 1;
  const pageSize = 10;

  if (page < 0) redirect(`/admin/products`);

  const productsData = await getProducts(page, pageSize);
  const totalProductsData = await productsCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect(`/admin/products`);

  return (
    <>
      <Heading>Administra Productos</Heading>

      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4 mb-6">
        <Link
          href={`/admin/products/new`}
          className="transition-colors duration-300 bg-amber-300 hover:bg-amber-400 rounded-md w-full lg:w-auto text-xl px-10 py-3 text-center font-semibold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>

      <ProductsTable products={products} />
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
