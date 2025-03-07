"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

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
      value: tasks.total - (tasks.completed + tasks.inProgress + tasks.overDue),
      fill: "#f59e0b",
    },
  ].filter((item) => item.value > 0);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={"value"}
              nameKey={"name"}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-bold text-3xl"
                        >
                          {tasks.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center w-full">
          <p>Showing total task count for the project</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskDistributionChart;
