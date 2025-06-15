"use client";

import { createOrder } from "@/actions/create-order";
import { OrderSchema } from "@/src/schema";
import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import { useMemo } from "react";
import { toast } from "react-toastify";
import ProductDetails from "./ProductDetails";

export default function OrderSummary() {
  const clearOrder = useStore((state) => state.clearOrder);
  const order = useStore((state) => state.order);
  const total = useMemo(
    () =>
      order.reduce(
        (total, item) => total + item.subtotal,
        0
      ),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };

    const result = OrderSchema.safeParse(data);

    // console.log(result);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((error) => {
        // console.error(error.message);
        toast.error(error.message);
      });
    }

    toast.success("Pedido creado correctamente");
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">
        Mi Pedido
      </h1>

      {order.length === 0 ? (
        <p className="text-center mt-10">
          No hay productos en el pedido
        </p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-10 text-center">
            Total a pagar:{" "}
            <span className="text-amber-500 font-black">
              {formatCurrency(total)}
            </span>
          </p>

          <form
            action={handleCreateOrder}
            className="mt-10 w-full space-y-5"
          >
            <input
              type="text"
              placeholder="Tu Nombre"
              className="bg-white border rounded border-gray-100 p-2 w-full"
              name="name"
            />

            <input
              type="submit"
              value="Confirmar Pedido"
              className="py-2 rounded uppercase font-bold text-white bg-black w-full text-center cursor-pointer"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
