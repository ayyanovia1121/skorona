import { User } from "@prisma/client";
import React from "react";

interface DataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    workspace: { name: string };
  };
}[];

const AppSidebarContainer = async ({data, workspaceId }: { data: DataProps, workspaceId: string }) => {
  const {} = await getWorkspaceProjectsById(workspaceId);

  return (
    <div>AppSidebarContainer</div>
  )
};

export default AppSidebarContainer;
