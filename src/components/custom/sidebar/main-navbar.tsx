"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";
import Link from "next/link";




const MainNavbar = () => {
  const workspaceId = useWorkspaceId();
  const { setOpenMobile } = useSidebar();

  const sidebarItems = [
    {
      label: "Home",
      href: `/workspace/${workspaceId}`,
      icon: LayoutDashboard,
      path: "home",
    },
    {
      label: "My Tasks",
      href: `/workspace/${workspaceId}/my-tasks`,
      icon: CheckSquare,
      path: "my-tasks",
    },
    {
      label: "Members",
      href: `/workspace/${workspaceId}/members`,
      icon: Users,
      path: "members",
    },
    {
      label: "Settings",
      href: `/workspace/${workspaceId}/settings`,
      icon: Settings,
      path: "settings",
    },
  ];
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu className="space-y-3">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label}
              className="px-2 py-1.5">
                <Link href={item.href}
                onClick={() => setOpenMobile(false)}>
                {<item.icon className="h-4 w-4 mr-2"/>}
                {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

export default MainNavbar;
