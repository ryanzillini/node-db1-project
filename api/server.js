const express = require("express");

const server = express();

server.use(express.json());
const accountsRouter = require("./accounts/accounts-router");

server.use("/api/accounts", accountsRouter);

server.use((error, req, res) => {
  res
    .status(error.status || 500)
    .json({ message: error.message, customMessage: "Not looking good" });
});

module.exports = server;
