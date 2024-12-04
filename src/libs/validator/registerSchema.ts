import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Name at least 3 character'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password at least 6 character'),
  phone: z.number(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
