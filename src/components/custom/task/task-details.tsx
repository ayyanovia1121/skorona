import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectProps } from "@/types";
import { Task, User } from "@prisma/client";
import React from "react";
import ProjectAvatar from "../projects/project-avatar";

interface TaskProps {
  task: Task & {
    assignedTo: User;
    project: ProjectProps;
  };
}

const TaskDetails = ({ task }: TaskProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between">
        <div>
          <CardTitle>{task?.title}</CardTitle>
          <div className="flex items-center gap-2">
            <ProjectAvatar name={task?.project?.name} />
            <p className="text-base text-muted-foreground">
              {task?.project?.name}
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col justify-end items-end gap-2">
            
        </div>
      </CardHeader>
    </Card>
  );
};

export default TaskDetails;
