"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="transition-colors duration-300 bg-amber-300 hover:bg-amber-400 rounded-md w-full lg:w-auto text-xl px-10 py-3 text-center font-semibold cursor-pointer"
    >
      Volver
    </button>
  );
}
