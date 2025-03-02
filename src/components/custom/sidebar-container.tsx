import { getWorkspaceProjectsById } from "@/utils/auth/project/get-workspace-project";
import { getUserById } from "@/utils/auth/user/get-user";
import { User } from "@prisma/client";
import React from "react";
import AppSidebar from "./app-sidebar";

export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    workspace: { name: string };
  };
}
[];

const AppSidebarContainer = async ({
  data,
  workspaceId,
}: {
  data: AppSidebarDataProps;
  workspaceId: string;
}) => {
  const { projects, workspaceMembers } = await getWorkspaceProjectsById(
    workspaceId
  );
  const user = await getUserById();

  return (
    <AppSidebar
      data={data}
      projects={projects}
      workspaceMembers={workspaceMembers}
      user={user as User}
    />
  );
};

export default AppSidebarContainer;
