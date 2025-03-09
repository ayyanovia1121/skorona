import { db } from "@/lib/db/prisma"
import { userRequired } from "../user/user-auth"

export const getProjectById = async(projectId: string) => {
    await userRequired()
    
    const tasks = await db.task.findMany({
        where: {
            projectId
        },
        include: {
            assignedTo: {
                select: {id: true, name: true, email: true, image: true}
            },
            project: {
                select: {id: true, name: true, workspaceId: true}
            },
            attachments: true
        }
    });

    return { tasks };
}