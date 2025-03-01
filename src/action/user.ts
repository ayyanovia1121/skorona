"use server";

import { UserDataType } from "@/components/custom/onboarding-form";
import { db } from "@/lib/db/prisma";
import { userSchema } from "@/schema";
import { userRequired } from "@/utils/auth/user/user-auth";
import { redirect } from "next/navigation";

export const createUser = async (data: UserDataType) => {
  const { user } = await userRequired();
  const validatedData = userSchema.parse(data);

  const newUser = await db.user.create({
    data: {
      id: user.id,
      email: user.email as string,
      name: validatedData.name,
      about: validatedData.about,
      country: validatedData.country,
      industryType: validatedData.industryType,
      role: validatedData.role,
      onboardingCompleted: true,
      image: validatedData.image || "",
      subscription: {
        create: {
          plan: "FREE",
          status: "ACTIVE",
          currentPeriodEnd: new Date(),
          cancelAtPeriodEnd: false,
        },
      },
    },

    select: {
      id: true,
      name: true,
      email: true,
      workspaces: true,
    },
  });

  // If the user has no workspaces, redirect to create workspace page
  if (newUser.workspaces.length === 0) {
    redirect("/create-workspace");
  }

  redirect("/workspace");
};
