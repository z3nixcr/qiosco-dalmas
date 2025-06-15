import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Heading>Producto No Encontrado</Heading>
      <Link
        href="/admin/products"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Ir a productos
      </Link>
    </div>
  );
}
