import CreateWorkspaceForm from "@/components/custom/create-workspace-form";
import { getUserWorkspaces } from "@/utils/auth/workspace/get-user-workspaces";
import { redirect } from "next/navigation";
import React from "react";

const CreateWorkspacePage = async () => {
  const { data } = await getUserWorkspaces();

  if (!data?.onboardingCompleted) redirect("/onboarding");

  return (
    <div>
      <CreateWorkspaceForm />
    </div>
  );
};

export default CreateWorkspacePage;
