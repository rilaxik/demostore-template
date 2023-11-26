import { z } from 'zod';

const uuid: z.ZodString = z.string().uuid();

export function isUUID(value: string): boolean {
  return uuid.safeParse(value).success;
}
