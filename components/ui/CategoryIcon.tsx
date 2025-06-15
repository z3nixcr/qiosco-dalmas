"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "../../app/generated/prisma/index";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({
  category,
}: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  return (
    <div
      className={`${
        category.slug === params.category
          ? "bg-amber-400"
          : ""
      } flex items-center gap-4 rounded-md w-full p-3 hover:bg-amber-200 transition-colors duration-300`}
    >
      <div className="w-16 h-16 relative">
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={`Icono de la categoria ${category.name}`}
          fill
        />
      </div>

      <Link
        className="text-xl font-semibold"
        href={`/orders/${category.slug}`}
      >
        {category.name}
      </Link>
    </div>
  );
}
