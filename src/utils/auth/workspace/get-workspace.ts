import { db } from "@/lib/db/prisma";
import { userRequired } from "../user/user-auth";

export const getWorkspaceById = async (workspaceId: string) => {
  const { user } = await userRequired();
  const isUserMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });

  if (!isUserMember) {
    throw new Error("You are not a member of this workspace");
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      members: {
        select:{userId: true,accessLevel: true}
      },
    },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return workspace;
};
