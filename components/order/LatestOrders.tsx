import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type LatestOrdersProps = {
  order: OrderWithProducts;
};

export default function LatestOrders({
  order,
}: LatestOrdersProps) {
  console.log(
    "LatestOrders component rendered with order:",
    order
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center flex-row-reverse justify-between mb-4 border-b border-dashed border-gray-300 pb-2">
        <p className="">
          Orden{" "}
          <span className="text-amber-500 font-bold">
            #{order.id}
          </span>
        </p>
        <h2 className="text-gray-600">
          Cliente:{" "}
          <span className="font-bold">{order.name}</span>
        </h2>
      </div>

      <ul className="bg-gray-100 p-4 rounded-lg">
        {order.orderProducts.map((product) => (
          <li
            key={product.id}
            className="flex justify-between mb-2 last-of-type:mb-0"
          >
            <span className="text-gray-800">
              {product.product.name} x {product.quantity}
            </span>
            <span className="text-gray-600">
              {formatCurrency(product.product.price)}
            </span>
          </li>
        ))}
      </ul>

      {/* <p className="text-gray-600 mb-4">
        Total: ${order.total.toFixed(2)}
      </p> */}
    </div>
  );
}
