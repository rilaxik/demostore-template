import { z } from "zod";

export const ProductRegisterSchema: z.ZodObject<any> = z.object({
  name: z.string(),
  sizing: z
    .array(z.string())
    .max(3, "Product sizing should not contain more than 3 parameters"),
  sizingShort: z.string().optional(),
  measurement: z.string().optional(),
  description: z.string(),
  material: z.array(z.string()),
  content: z.number().min(0, "Content can't be less than 0"),
  pricePerPiece: z.number().optional(),
  price: z.number(),
  isInStock: z.boolean(),
  tags: z.array(z.string()),
  image: z.string(),
  variants: z
    .array(z.string())
    .min(2, "Provide no variants if there are 2 or less available")
    .optional(),
});

export type ProductRegisterType = z.infer<typeof ProductRegisterSchema>;

export const ProductGetOneSchema: z.ZodObject<any> = z.object({
  id: z.string(),
});
