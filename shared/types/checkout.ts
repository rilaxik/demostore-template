import { z } from "zod";
import { ShopCheckoutPayment, ShopCheckoutShipping } from "./shop";

export const CheckoutRegisterSchema: z.ZodObject<any> = z.object({
  user: z.string().uuid().nullable().optional(),
  cart: z.any(),
  discount: z
    .object({ amount: z.number(), system: z.string() })
    .nullable()
    .optional(),
  customer: z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zip: z.string(),
  }),
  billing: z.object({
    shipping: z.nativeEnum(ShopCheckoutShipping),
    payment: z.nativeEnum(ShopCheckoutPayment),
  }),
  isPaid: z.boolean(),
  isCompleted: z.boolean(),
});

export const CheckoutRawSchema: z.ZodObject<any> = z.object({
  user: z.string().uuid().nullable().optional(),
  cart: z.map(z.string(), z.number()),
  discount: z
    .object({ amount: z.number(), system: z.string() })
    .nullable()
    .optional(),
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    zip: z.string().min(1),
  }),
  billing: z.object({
    shipping: z.nativeEnum(ShopCheckoutShipping),
    payment: z.nativeEnum(ShopCheckoutPayment),
  }),
  isPaid: z.boolean(),
  isCompleted: z.boolean(),
});

export type CheckoutRawType = z.infer<typeof CheckoutRawSchema>;

export const CheckoutGetSchema: z.ZodObject<any> = z.object({
  id: z.string().uuid(),
});

export const CheckoutDiscountSchema: z.ZodObject<any> = z.object({
  amount: z.number(),
  system: z.string(),
});

export type CheckoutDiscountType = z.infer<typeof CheckoutDiscountSchema>;
