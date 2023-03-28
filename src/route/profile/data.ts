import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma";

export const getUserProfileData = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      username: true,
      profilePic: true,
    },
  });
};
