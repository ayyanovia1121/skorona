"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WorkspaceAvatar from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";

const WorkspaceSelector = ({
  workspaces,
}: {
  workspaces: WorkspaceProps[];
}) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    WorkspaceProps | undefined
  >(undefined);

  const onSelectedWorkspace = (id: string) => {
    setSelectedWorkspace(
      workspaces.find((workspace) => workspace.workspaceId === id)
    );
    router.push(`/workspace/${id}`);
  };

  useEffect(() => {
    if (workspaceId && workspaces) {
      setSelectedWorkspace(
        workspaces.find((workspace) => workspace.workspaceId === workspaceId)
      );
    }
  }, [workspaceId, workspaces]);
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={"lg"}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <WorkspaceAvatar
                  name={(selectedWorkspace?.workspace.name as string) || "W"}
                />
                <div className="font-semibold text-muted-foreground">
                  {selectedWorkspace?.workspace?.name as string}
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              {workspaces?.map((item) => (
                <DropdownMenuItem key={item.workspaceId} onSelect={() => onSelectedWorkspace(item?.workspaceId)}>
                  <div className="flex flex-row items-center gap-2">
                    <WorkspaceAvatar 
                    name={item?.workspace.name as string} 
                    />
                    <p className="font-semibold text-muted-foreground">{item?.workspace.name}</p>
                  </div>

                  {item.workspaceId === workspaceId && (
                    <Check className="ml-auto" />
                  )}

                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

export default WorkspaceSelector;
