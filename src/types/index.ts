import {
  Order,
  OrderProduct,
  Product,
} from "../../app/generated/prisma/index";

export type OrderItem = Pick<
  Product,
  "id" | "name" | "price"
> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProduct & {
    product: Product;
  })[];
};
