const express = require("express");

const authRouter = require("../auth/auth");
const userRouter = require("../users/user-router.js");
const serverMiddleware = require("./server-middleware.js");

const server = express();

serverMiddleware(server);

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.json({ message: "Let's do this thang!!" });
});

module.exports = server;
