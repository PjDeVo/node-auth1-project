const express = require("express");
const helmet = require("helmet");
const authRouter = require("../auth/auth-router.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use("/api/users/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "App is working :)" });
});

module.exports = server;
