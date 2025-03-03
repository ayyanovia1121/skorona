import React from "react";
import { AppSidebarDataProps } from "./sidebar-container";
import { User } from "@prisma/client";
import { ProjectProps, workspaceMemberProps } from "@/types";
import { Sidebar, SidebarGroupLabel, SidebarHeader } from "../../ui/sidebar";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import WorkspaceSelector from "./workspace-selector";

const AppSidebar = ({
  data,
  projects,
  workspaceMembers,
  user,
}: {
  data: AppSidebarDataProps;
  projects: ProjectProps[];
  workspaceMembers: workspaceMemberProps[];
  user: User;
}) => {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="bg-background">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={"/assets/logo.svg"} />
            </Avatar>
            <SidebarGroupLabel>
              <span className="text-xl font-bold">Skorona</span>
            </SidebarGroupLabel>
          </div>
          <div className="flex justify-between mb-0">
            <SidebarGroupLabel className="text-sm font-semibold mb-2 text-muted-foreground uppercase">
              Workspace
            </SidebarGroupLabel>
            <Button asChild size={"icon"} className="size-5">
              <Link href={"/create-workspace"}>
                <PlusIcon />
              </Link>
            </Button>
          </div>
          <WorkspaceSelector
            workspaces={Array.isArray(data.workspaces) ? data.workspaces : []}
          />
        </SidebarHeader>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
