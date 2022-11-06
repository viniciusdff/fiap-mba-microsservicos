const express = require("express");
const routeFinancas = require("./financas");
const routeLoginFinancas = require("./loginFinancas");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(routeFinancas);
  app.use(routeLoginFinancas);

  app.get("/", (req, res) => {
    res.status(200).json({
      status: "OK",
      mensagem: "Server is UP!",
    });
  });
};
