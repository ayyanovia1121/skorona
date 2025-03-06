
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

export const projectSchema = z.object({
  name: z.string().min(3, { message: "Workspace must be at least 3 characters" }),
  description: z.string().optional(),
  workspaceId: z.string(),
  memberAccess: z.array(z.string()).optional(),
});

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Task title is required and must be at least 2 characters" }),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
    "BLOCKED",
    "BACKLOG",
    "IN_REVIEW",
  ]),
  dueDate: z.date(),
  startDate: z.date(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH","CRITICAL"]),
  attachments: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      type: z.enum(["IMAGE", "PDF"]),
    })
  ).optional(),
});
