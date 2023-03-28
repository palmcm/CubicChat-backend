import { Response } from "express";
import { getUserProfileData } from "./data";

export const getUserProfile = async (userId: string, res: Response) => {
  const profile = await getUserProfileData(userId);
  console.log(profile);
  res.send(profile);
};
