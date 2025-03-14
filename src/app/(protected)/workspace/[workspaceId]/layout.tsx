import Navbar from "@/components/custom/navbar";
import AppSidebarContainer from "@/components/custom/sidebar/sidebar-container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserWorkspaces } from "@/utils/auth/workspace/get-user-workspaces";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}
const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { data } = await getUserWorkspaces();

  const { workspaceId } = await params;

  if (data?.onboardingCompleted && !data?.workspaces) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }
  return (
    <SidebarProvider>
      <div className="w-full flex h-screen bg-background">
        <AppSidebarContainer data={data as any} workspaceId={workspaceId} />
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-center">
            <SidebarTrigger className="pt-3" />
            <Navbar
              id={data?.id}
              name={data?.name as string}
              email={data?.email as string}
              image={data?.image as string}
            />
          </div>
          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
