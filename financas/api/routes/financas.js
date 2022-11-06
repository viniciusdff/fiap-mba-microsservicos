const { Router } = require("express");
const usuarioLogado = require("../middleware/usuarioLogado");
const FinancasController = require("../controller/FinancasController");

const router = Router();

router
  .post("/financas", usuarioLogado, FinancasController.insertFinancas)
  .put("/financas", usuarioLogado, FinancasController.updateFinanca)
  .delete("/financas", usuarioLogado, FinancasController.deleteFinanca)
  .get("/financas", usuarioLogado, FinancasController.getFinancas);

module.exports = router;
