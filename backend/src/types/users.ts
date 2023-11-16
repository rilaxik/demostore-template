import { z } from 'zod';

export const UsersGetOneSchema: z.ZodObject<any> = z.object({
  login: z.string(),
});

export const UsersSaveSchema: z.ZodObject<any> = z.object({
  login: z.string().min(5, 'Login must be at least 5 symbols long'),
  password: z.string().min(8, 'Password must be at least 8 symbols long'),
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
});

export type UsersSaveType = z.infer<typeof UsersSaveSchema>;

export const UsersLoginSchema: z.ZodObject<any> = z.object({
  login: z.string(),
  password: z.string(),
});
