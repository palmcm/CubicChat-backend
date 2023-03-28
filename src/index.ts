import { createServer } from "http";

const express = require("express");
const app = express();

const httpServer = require("http");
const server = httpServer.createServer(app);
const chatSocket = require("./socket");
const io = chatSocket(server);

const port = process.env.PORT || 3000;

const authRouter = require("./route/auth");
const profileRouter = require("./route/profile");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
