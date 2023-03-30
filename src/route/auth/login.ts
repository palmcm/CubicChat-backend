import { Request, Response } from "express";
import prisma from "../../prisma";
const bcrypt = require("bcryptjs");

module.exports = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (!email || !password) return res.status(400).send("Bad request");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(401).send("Email or password is incorrect");
    const isPasswordCorrect: boolean = await bcrypt.compareSync(
      password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(401).send("Email or password is incorrect");

    req.cookies.userId = user.userId;
    res.status(200).send("User successfully logged in");
  } catch (error) {
    res.status(500).send(error);
  }
};
