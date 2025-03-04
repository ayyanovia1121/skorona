import { db } from "@/lib/db/prisma";
import { userRequired } from "../user/user-auth";
import { TaskStatus } from "@prisma/client";

export const getProjectDetails = async (
  workspaceId: string,
  projectId: string
) => {
  try {
    const { user } = await userRequired();

    const [isUserMember, totalWorkspaceMembers] = await Promise.all([
      db.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId: user.id,
            workspaceId,
          },
        },
      }),
      db.workspaceMember.count({
        where: {
          workspaceId,
        },
      }),
    ]);

    if (!isUserMember) {
      throw new Error("You are not a member of this workspace");
    }

    const [project, comments] = await Promise.all([
      db.project.findUnique({
        where: { id: projectId },
        include: {
          projectAccess: {
            include: {
              workspaceMember: {
                include: {
                  user: {
                    select: { id: true, name: true, image: true },
                  },
                },
              },
            },
          },
          tasks: {
            include: {
              assignedTo: {
                select: { id: true, name: true, image: true },
              },
              project: {
                select: { id: true, name: true },
              },
            },
          },
          activities: {
            include: {
              user: {
                select: { id: true, name: true, image: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      db.comment.findMany({
        where: { projectId },
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const tasks = {
      total: project?.tasks.length,
      completed: project?.tasks.filter(
        (task) => task.status === TaskStatus.COMPLETED
      ).length,
      inProgress: project?.tasks.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS
      ).length,
      overDue: project?.tasks.filter(
        (task) =>
          task.status !== TaskStatus.COMPLETED &&
          task.dueDate &&
          new Date(task.dueDate) < new Date()
      ).length,
      items: project?.tasks,
    };

    return {
      project: {
        ...project,
        members: project?.projectAccess.map((access) => access.workspaceMember),
      },
      tasks,
      activities: project?.activities,
      totalWorkspaceMembers,
      comments,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
      message: "Failed to get project details",
    };
  }
};
