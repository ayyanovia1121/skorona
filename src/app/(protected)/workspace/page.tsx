import { getUserWorkspaces } from "@/utils/auth/workspace/get-user-workspaces";
import { redirect } from "next/navigation";

const WorkspacePage = async () => {
  const { data } = await getUserWorkspaces();

  // If the user has completed onboarding and has no workspaces, redirect to create workspace page
  if (data?.onboardingCompleted && data?.workspaces.length === 0) {
    redirect("/create-workspace");
  }
  // If the user has not completed onboarding, redirect to onboarding page
  else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }
  // If the user has completed onboarding and has workspaces, redirect to the first workspace
  else {
    redirect(`/workspace/${data?.workspaces[0].workspaceId}`);
  }
};
export default WorkspacePage;
