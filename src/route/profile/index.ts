import { Request, Response } from "express";
import { getUserProfile } from "./services";

const express = require("express");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return getUserProfile(res.locals.userId);
});

router.put("/username-edit", (req: Request, res: Response) => {
  // code to edit a user's username
});

router.put("/image-random", (req: Request, res: Response) => {
  // code to random a user's profile image
});

module.exports = router;
