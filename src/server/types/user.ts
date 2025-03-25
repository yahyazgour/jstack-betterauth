import { boolean, object, string } from "zod";

// Base schemas
const passwordSchema = string({ required_error: "Password is required" })
  .min(8, "Password must be atleast 8 characters")
  .max(32, "Password can not exceed 32 characters");

const confirmPasswordSchema = string({ required_error: "Confirm password is required" })
  .min(8, "Confirm password must be atleast 8 characters")
  .max(32, "Confirm password can not exceed 32 characters");

const currentPasswordSchema = string({ required_error: "Current password is required" })
  .min(8, "Current password must be atleast 8 characters")
  .max(32, "Current password can not exceed 32 characters");

const emailSchema = string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

const nameSchema = string({ required_error: "Name is required" })
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters");

const imageSchema = string().optional();

const revokeOtherSessionsSchema = boolean().optional();

// Form schemas
export const updateProfileSchema = object({
  name: nameSchema,
  image: imageSchema,
});

export const updateEmailSchema = object({
  email: emailSchema,
});

export const updatePasswordSchema = object({
  revokeOtherSessions: revokeOtherSessionsSchema,
  currentPassword: currentPasswordSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
