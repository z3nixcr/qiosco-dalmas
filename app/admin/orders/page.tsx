"use client";

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersAdmin() {
  const url = "/admin/orders/api";
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
      <Heading>Administra Ordenes</Heading>

      {/* <form action={refreshOrders}>
        <input
          type="submit"
          value="Actualizar Ordenes"
          className="transition-colors duration-300 bg-amber-300 hover:bg-amber-400 rounded-md w-full lg:w-auto text-xl px-10 py-3 text-center font-semibold cursor-pointer"
        />
      </form> */}

      {data?.length === 0 ? (
        <p className="text-center text-gray-600 uppercase font-bold mt-10">
          No hay ordenes pendientes
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 items-start">
          {data?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </>
  );
}
