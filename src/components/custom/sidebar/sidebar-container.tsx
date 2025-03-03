import { getWorkspaceProjectsById } from "@/utils/auth/project/get-workspace-project";
import { getUserById } from "@/utils/auth/user/get-user";
import { $Enums, User } from "@prisma/client";
import React from "react";
import AppSidebar from "./app-sidebar";
import { ProjectProps, workspaceMemberProps } from "@/types";

// extend the User used to include workspaces
export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: $Enums.AccessLevel;
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
      projects={projects as unknown as ProjectProps[]}
      workspaceMembers={workspaceMembers as unknown as workspaceMemberProps[]}
      user={user as User}
    />
  );
};

export default AppSidebarContainer;
