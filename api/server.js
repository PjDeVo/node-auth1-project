const express = require("express");
const helmet = require("helmet");

const session = require("express-session");
const knexSessionConnect = require("connect-session-knex");
const knexSessionStore = knexSessionConnect(session);

const sessionConfig = {
  name: "psession",
  secret: "muh secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../database/knex-config.js"),
    tableName: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

const authRouter = require("../auth/auth-router.js");
const userRouter = require("../user/user-router.js");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));
server.use("/api/users/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "App is working :)" });
});

module.exports = server;
