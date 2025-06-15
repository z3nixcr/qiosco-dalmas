import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages?: number; // Optional, in case you want to use it later
};

export default function ProductsPagination({
  page,
  totalPages = 1, // Default to 1 if not provided
}: ProductsPaginationProps) {
  // Construyendo numeración de páginas
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav className="flex justify-center py-10 gap-4">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      )}

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Link
            key={p}
            href={`/admin/products?page=${p}`}
            className={`transition-all duration-200 flex justify-center items-center w-8 rounded-md border border-gray-300 p-2 text-sm font-medium ${
              p === page
                ? "text-white bg-blue-600"
                : "text-gray-700 bg-white hover:bg-gray-50"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
