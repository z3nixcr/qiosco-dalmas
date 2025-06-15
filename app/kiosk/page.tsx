"use client";

import LatestOrders from "@/components/order/LatestOrders";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function KioskOrdersPage() {
  const url = "/kiosk/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<
    OrderWithProducts[]
  >(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">
        Ordenes Listas
      </h1>
      <Logo />

      {data?.length === 0 ? (
        <p className="text-center text-gray-600 uppercase font-bold mt-10">
          No hay ordenes pendientes
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 place-content-center max-w-5xl mx-auto mt-10">
          {data?.map((order) => (
            <LatestOrders
              key={order.id}
              order={order}
              // isKiosk={true}
            />
          ))}
        </div>
      )}
    </>
  );
}
