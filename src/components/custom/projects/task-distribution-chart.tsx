'use client'

import { ChartConfig } from "@/components/ui/chart";

interface TaskDistributionProps {
    tasks: {
        total: number;
        completed: number;
        inProgress: number;
        overDue: number;
    };
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
  },
  overDue: {
    label: "Overdue",
  },
  todo: {
    label: "Todo",
  },
} satisfies ChartConfig;

const TaskDistributionChart = ({ tasks }: TaskDistributionProps) => {
 const data = [
  {
    name: "Completed",
    value: tasks.completed,
    fill: "#22c55e",
  },
  {
    name: "In Progress",
    value: tasks.inProgress,
    fill: "#3b82f6",
  },
  {
    name: "Overdue",
    value: tasks.overDue,
    fill: "#ef4444",
  },
  {
    name: "Todo",
    value: tasks.total - tasks.completed - tasks.inProgress - tasks.overDue,
    fill: "#f59e0b",
  },
 ]
}

export default TaskDistributionChart