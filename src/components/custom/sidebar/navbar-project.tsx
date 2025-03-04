"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProjectProps, workspaceMemberProps } from "@/types";
import { usePathname } from "next/navigation";
import CreateProjectForm from "../projects/create-project-form";

const NavbarProject = ({projects, workspaceMembers}: {
  projects: ProjectProps[];
  workspaceMembers: workspaceMemberProps[];
}) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex justify-between">
          <span className="text-sm font-semibold  text-muted-foreground uppercase">
            Projects
          </span>
          <CreateProjectForm workspaceMembers={workspaceMembers} />
        </SidebarGroupLabel>
      </SidebarGroup>

      <SidebarMenu className="space-y-3">
        {projects?.map((project) => {
          const href = `/workspace/${project.workspaceId}/projects/${project.id}`;
          return (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton>
                <a
                  href={href}
                  className={
                    pathname === href
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }
                >
                  {project.name}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </>
  );
};

export default NavbarProject;
