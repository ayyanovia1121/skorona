'use server';

import { CreateWorkspaceDataType } from "@/components/custom/create-workspace-form";
import { db } from "@/lib/db/prisma";
import { workspaceSchema } from "@/schema";
import { userRequired } from "@/utils/auth/user/user-auth";
import { generateInviteCode } from "@/utils/generate-invite-code";

export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
try {
    const {user} = await userRequired();
    const validatedData = workspaceSchema.parse(data);

   const response = await db.workspace.create({
        data: {
            name: validatedData.name,
            description: validatedData.description,
            ownerId: user.id,
            inviteCode: generateInviteCode(),
            members: {
                create: {
                    userId: user.id,
                    accessLevel: "OWNER",
                },
            }
        },
    });
    return response;
} catch (error) {
    console.log(error);
   return {
    status: 500,
    message: "An error occurred while creating the workspace."
   }
}
}