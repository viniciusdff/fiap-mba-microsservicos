const express = require("express");
const routeUsers = require("./usuarios");
const login = require("./login");
const routeFinancas = require("../../../financas/api/routes/financas");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(routeUsers);
  app.use(login);
  app.use(routeFinancas);

  app.get("/", (req, res) => {
    res.status(200).json({
      status: "OK",
      mensagem: "Servidor de usuários UP!",
    });
  });
};
