
import { userRequired } from "../user/user-auth";
import { db } from "../../../lib/db/prisma";

export const getUserWorkspaces = async () => {
  try {
    // Get the user from the session
    const { user } = await userRequired();

    // Get the workspaces for the user
    const workspaces = await db.user.findUnique({
      where: { id: user.id },
      include: {
        // Include the workspaces for the user
        workspaces: {
          select: {
            userId: true,
            workspaceId: true,
            accessLevel: true,
            createdAt: true,
            workspace: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { data: workspaces };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
      message: "Failed to get user workspaces",
      status: 500,
    };
  }
};
