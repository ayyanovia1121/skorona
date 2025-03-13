import { TaskStatus } from "@prisma/client";

export const roleList = [
  "Designer",
  "Developer",
  "Founder",
  "Project Manager",
  "QA Analyst",
  "Team Member",
  "Tester",
  "UX Designer",
  "Others",
];
export const industryTypesList = [
  "Consumer Goods",
  "Education",
  "Finance",
  "Government",
  "Healthcare",
  "Manufacturing",
  "Marketing",
  "Retail",
  "Technology",
  "Others",
];

export const taskStatusList = [
  {
    status: TaskStatus.TODO,
    label: "TO DO",
    color: "bg-blue-500",
  },
  {
    status: TaskStatus.IN_PROGRESS,
    label: "IN PROGRESS",
    color: "bg-yellow-500",
  },
  {
    status: TaskStatus.COMPLETED,
    label: "COMPLETED",
    color: "bg-green-500",
  },
  {
    status: TaskStatus.BLOCKED,
    label: "BLOCKED",
    color: "bg-red-500",
  },
  {
    status: TaskStatus.BACKLOG,
    label: "BACKLOG",
    color: "bg-gray-500",
  },
  {
    status: TaskStatus.IN_REVIEW,
    label: "IN REVIEW",
    color: "bg-blue-500",
  },
];

export const taskStatusVariant = {
  [TaskStatus.BLOCKED]: "#ef4444", // Red
  [TaskStatus.TODO]: "#6366f1", // Blue
  [TaskStatus.IN_PROGRESS]: "#f59e0b", // Orange
  [TaskStatus.COMPLETED]: "#10b981", // Green
  [TaskStatus.BACKLOG]: "#ec4899", // Pink
  [TaskStatus.IN_REVIEW]: "#a855f7", // Purple
  default: "#6366f1", // Default Blue
};
