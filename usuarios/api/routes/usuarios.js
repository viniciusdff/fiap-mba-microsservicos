const { Router } = require("express");
const UsuarioController = require("../controller/UsuarioController");
const usuarioLogado = require("../middleware/usuarioLogado");

const router = Router();

router
  .get("/usuarios", UsuarioController.selectAllUsers)
  .post("/usuarios", UsuarioController.insertUser)
  .put("/usuarios", UsuarioController.updateUser)
  .delete("/usuarios", UsuarioController.deleteUser)
  .put("/updatePassword", usuarioLogado, UsuarioController.updatePassword);

module.exports = router;
