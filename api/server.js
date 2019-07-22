const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const UserRouter = require("../users/user-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(UserRouter);

module.exports = server;
