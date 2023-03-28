import prisma from "../../prisma";

export const getUserProfileData = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: {
      userId,
    },
    select: {
      username: true,
      profileImage: true,
    },
  });
  console.log(profile);
  return profile;
};
