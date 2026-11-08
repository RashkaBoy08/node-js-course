import { email, z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("email must be valid"),
  password: z
    .string()
    .min(6, "password must be at least 6 chars")
    .max(12, "password length 12 chars")
    .regex(/[A-Z]/, "password must include UPPERCASE letter")
    .regex(/[a-z]/, "password must include LOWERCASE letter")
    .regex(/[0-9]/, "password must include NUMBER")
    .regex(/[^A-Za-z0-9]/, "must include special letter"),
});
