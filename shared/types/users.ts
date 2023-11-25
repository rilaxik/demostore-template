import { z } from "zod";

export const UsersGetSchema: z.ZodObject<any> = z.object({
  email: z.string(),
});

export const UsersRegisterSchema: z.ZodObject<any> = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 symbols long"),
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
});

export type UsersType = z.infer<typeof UsersRegisterSchema>;

export const UsersLoginSchema: z.ZodObject<any> = z.object({
  email: z.string(),
  password: z.string(),
});

export type UserProfileType = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};
