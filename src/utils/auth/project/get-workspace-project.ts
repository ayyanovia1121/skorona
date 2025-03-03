import { userRequired } from "../user/user-auth";
import { db } from "../../../lib/db/prisma";
import { AccessLevel, Prisma } from "@prisma/client";

export const getWorkspaceProjectsById = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();

    // Check if the user is a member of the workspace
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

    // Get the projects for the workspace
    // Prisma.ProjectWhereInput is used to filter the projects based on the user's access level
    const query: Prisma.ProjectWhereInput =
      isUserMember.accessLevel === AccessLevel.OWNER
        ? { workspaceId }
        : {
            projectAccess: {
              some: {
                hasAccess: true,
                workspaceMember: {
                  userId: user.id,
                  workspaceId,
                },
              },
            },
          };
    
    // Get the projects and workspace members
    // Promise.all is used to get the projects and workspace members in parallel
    const [projects, workspaceMembers] = await Promise.all([
      // Get the projects for the workspace
      // findMany is used to get the projects
      db.project.findMany({
        where: query,
        select: {
          id: true,
          name: true,
          workspaceId: true,
          description: true,
        },
      }),
      db.workspaceMember.findMany({
        where: { workspaceId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      }),
    ]);

    return {
       projects, workspaceMembers,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
      message: "Failed to get workspace projects",
    };
  }
};
