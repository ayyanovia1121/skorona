import { CommentProps, ProjectProps } from "@/types";
import { Activity, Task } from "@prisma/client";
import React from "react";
import ProjectHeader from "./project-header";

interface ProjectDashboardProps {
  project: ProjectProps;
  tasks: {
    completed: number;
    inProgress: number;
    overDue: number;
    total: number;
    items: Task[];
  };
  activities: Activity[];
  totalWorkspaceMembers: number;
  comments: CommentProps[];
}
const ProjectDashboard = ({
  project,
  tasks,
  activities,
  totalWorkspaceMembers,
  comments,
}: ProjectDashboardProps) => {
  return <>
  <div className="flex flex-col gap-6 px-2 md:px-4 2xl:px-6 py-0">
    <ProjectHeader 
      project={project as unknown as ProjectProps}
    />
  </div>
  </>;
};

export default ProjectDashboard;
