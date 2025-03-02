import { db } from "../../../lib/db/prisma";
import { userRequired } from "./user-auth";

export const getUserById = async () => {
    try {
        const { user } = await userRequired();

        const data = await db.user.findUnique({
            where: { id: user.id },
        })
        return data;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: true,
            message: "Failed to get user",
            status: 500,
        };
    }
}