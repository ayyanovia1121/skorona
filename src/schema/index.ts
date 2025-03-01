
import { z } from "zod";
export const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is required and must be at least 2 characters" })
    .max(100, {
      message: "Name is required and must be at most 100 characters",
    }),
  about: z.string().optional(),
  country: z.string().min(2, { message: "Country is required" }),
  industryType: z.string().min(2, { message: "Industry type is required" }),
  email: z.string().email().min(2, { message: "Invalid email address" }),
  role: z.string().min(2, { message: "Role is required" }),
  image: z.string().optional(),
});

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Workspace name is required and must be at least 2 characters",
    })
    .max(100, {
      message: "Workspace name is required and must be at most 100 characters",
    }),
    description: z.string().optional(),
});
