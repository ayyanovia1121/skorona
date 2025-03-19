import { db } from "@/lib/db/prisma";
import { userRequired } from "@/utils/auth/user/user-auth";

export const getMyTasks = async () => {
    const { user } = await userRequired();

    const tasks = await db.task.findMany({
        where: {
            assigneeId: user.id
        },
        include: {
            project: {
                select: {id: true,name: true,workspaceId: true}
            },
            attachments:{
                select: {id: true,name: true}
            }
        },
    });

    return tasks;
}