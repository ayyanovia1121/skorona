import { getProjectById } from "@/utils/auth/project/get-project-by-id";
import React from "react";
import ProjectTable from "./project-table";

const ProjectTableContainer = async ({ projectId }: { projectId: string }) => {
  const { tasks } = await getProjectById(projectId);

  return (
    <div className="p-0">
      <ProjectTable tasks={tasks as any} />
    </div>
  );
};

export default ProjectTableContainer;
