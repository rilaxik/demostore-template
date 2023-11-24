import { z } from "zod";

export enum ShopCategoriesEnum {
  home = "home",
  garden = "garden",
  tools = "tools",
  misc = "misc",
}

export const ShopCategoriesSchema: z.ZodNativeEnum<typeof ShopCategoriesEnum> =
  z.nativeEnum(ShopCategoriesEnum);

export const ShopQuerySchema = z.object({
  category: ShopCategoriesSchema.optional(),
  query: z.string().optional(),
});
