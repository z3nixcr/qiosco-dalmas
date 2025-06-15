import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import { Product } from "../../app/generated/prisma/index";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

// export default function ProductCard({
//   product,
// }: ProductCardProps) {
//   const imagePath = getImagePath(product.image);

//   return (
//     <div className="border bg-white rounded-md border-gray-200">
//       <Image
//         src={imagePath}
//         alt={`Imagen del producto ${product.name}`}
//         width={500}
//         height={500}
//         className="rounded-t-md"
//       />

//       <div className="p-5">
//         <h3 className="text-2xl font-bold">
//           {product.name}
//         </h3>
//         <p className="mt-5 font-black text-4xl text-amber-500">
//           {formatCurrency(product.price)}
//         </p>
//         <AddProductButton product={product} />
//       </div>
//     </div>
//   );
// }
export default function ProductCard({
  product,
}: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border bg-white rounded-md border-gray-200 h-[420px] flex flex-col justify-between">
      <Image
        src={imagePath}
        alt={`Imagen del producto ${product.name}`}
        width={500}
        height={500}
        className="rounded-t-md object-cover h-[200px] w-full"
      />

      <div className="p-5 flex flex-col justify-between h-full">
        <h3 className="text-lg font-bold leading-tight line-clamp-2 h-[48px] overflow-hidden">
          {product.name}
        </h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
