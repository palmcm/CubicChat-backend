import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  // code to sign up a new user
});

router.post("/login", (req: Request, res: Response) => {
  // code to log in a user
});

module.exports = router;
