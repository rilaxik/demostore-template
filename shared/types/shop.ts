import { z } from "zod";

export enum ShopCategoriesEnum {
  home = "home",
  garden = "garden",
  tools = "tools",
  misc = "misc",
}
export enum ShopCheckoutShipping {
  STANDARD = "Standard",
  EXPRESS = "Express",
}

export enum ShopCheckoutPayment {
  ON_DELIVERY = "Cash on delivery",
  IN_ADVANCE = "Paid in advance",
  INVOICE = "Invoice",
  UPON_INVOICE = "Pay upon invoice",
  CREDIT_CARD = "Credit or debit card",
}

export const ShopCategoriesSchema: z.ZodNativeEnum<typeof ShopCategoriesEnum> =
  z.nativeEnum(ShopCategoriesEnum);

export const ShopQuerySchema = z.object({
  category: ShopCategoriesSchema.optional(),
  query: z.string().optional(),
});
