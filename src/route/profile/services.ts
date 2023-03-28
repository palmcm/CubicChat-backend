import { getUserProfileData } from "./data";

export const getUserProfile = async (userId: string) => {
  return await getUserProfileData(userId);
};
