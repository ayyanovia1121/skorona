import WorkspaceSettingsForm from "@/components/custom/workspace/workspace-settings-form";
import { getWorkspaceById } from "@/utils/auth/workspace/get-workspace";

type Props = {};

const WorkspaceSettingsPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  const { data } = await getWorkspaceById(workspaceId);

  return <div>
    <WorkspaceSettingsForm data={data as any}/>
  </div>
};

export default WorkspaceSettingsPage;
