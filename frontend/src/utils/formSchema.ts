import { z } from "zod";
export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
