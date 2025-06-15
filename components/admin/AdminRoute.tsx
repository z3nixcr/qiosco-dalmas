"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({
  link,
}: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname === link.url;

  return (
    <Link
      className={`${
        isActive ? "bg-amber-400" : ""
      } font-bold text-lg p-3 rounded-md hover:bg-amber-200 transition-colors duration-300`}
      href={link.url}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
}
