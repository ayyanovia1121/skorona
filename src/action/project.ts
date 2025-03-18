"use server";

import { ProjectDataType } from "@/components/custom/projects/create-project-form";
import { db } from "@/lib/db/prisma";
import { projectSchema } from "@/schema";
import { userRequired } from "@/utils/auth/user/user-auth";

export const createNewProject = async (data: ProjectDataType) => {
  // Your server-side logic here
  const { user } = await userRequired();

  const workspace = await db.workspace.findUnique({
    where: {
      id: data.workspaceId,
    },
    include: {
      projects: {
        select: { id: true },
      },
    },
  });
  //   validate the data
  const validatedData = projectSchema.parse(data);

  const workspaceMembers = await db.workspaceMember.findMany({
    where: {
      workspaceId: data.workspaceId,
    },
  });

  const isUserMember = workspaceMembers?.some(
    (member) => member.userId === user.id
  );

  if (!isUserMember) {
    throw new Error("You are not a member of this workspace");
  }

  //   check if the user has access to the members in the project

  //  if the user is not in the memberAccess array, add them to the array
  if (validatedData.memberAccess?.length === 0) {
    // if the memberAccess array is empty, add the user to the array
    validatedData.memberAccess = [user.id];
  } else if (!validatedData.memberAccess?.includes(user.id)) {
    validatedData.memberAccess?.push(user.id);
  }

  await db.project.create({
    data: {
      name: validatedData.name,
      description: validatedData.description || "",
      workspaceId: validatedData.workspaceId,
      projectAccess: {
        create: validatedData.memberAccess?.map((memberId) => ({
          workspaceMemberId: workspaceMembers.find(
            (member) => member?.userId === memberId
          )?.id!,
          hasAccess: true,
        })),
      },
      activities: {
        create: {
          type: "PROJECT_CREATED",
          description: `${validatedData.name} created the project`,
          userId: user.id,
        },
      },
    },
  });

  return { success: true };
};

export const postComment = async (
  workspaceId: string,
  projectId: string,
  content: string
) => {
  const { user } = await userRequired();
  const isMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });

  if (!isMember) {
    throw new Error("You are not a member of this workspace");
  }

  const projectAccess = await db.projectAccess.findUnique({
    where: {
      workspaceMemberId_projectId: {
        workspaceMemberId: isMember.id,
        projectId,
      },
    },
  });

  if (!projectAccess) {
    throw new Error("You do not have access to this project");
  }

  const comment = await db.comment.create({
    data: {
      content,
      projectId,
      userId: user.id,
    },
  });

  return comment;
};
