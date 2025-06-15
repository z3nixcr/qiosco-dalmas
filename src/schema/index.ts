import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "Tu nombre es obligatorio"),
  total: z.number().min(1, "Hay un error en la orden"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => val > 0, {
      message: "Hay un error en el ID de la orden",
    }),
});

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, "No puede buscar con un campo vacío"),
});

export const ProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "El Nombre del Producto no puede ir vacio",
  }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, {
      message: "Precio no válido",
    })
    .or(
      z
        .number()
        .min(1, { message: "La Categoría es Obligatoria" })
    ),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, {
      message: "La Categoría es Obligatoria",
    })
    .or(
      z
        .number()
        .min(1, { message: "La Categoría es Obligatoria" })
    ),
  image: z.string().min(1, "La imagen es obligatoria"),
});
