import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/", require("./getUserProfile"));

router.put("/username-edit", (req: Request, res: Response) => {
  // code to edit a user's username
});

router.put("/image-random", (req: Request, res: Response) => {
  // code to random a user's profile image
});

module.exports = router;
