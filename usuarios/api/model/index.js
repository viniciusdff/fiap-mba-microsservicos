const mockUsuarios = require("../mocks/listaUsuarios.json");
const mongoose = require("mongoose");

module.exports = () => {
  async function pesquisarTodosUsuarios() {
    return mockUsuarios;
  }
  return {
    pesquisarTodosUsuarios,
  };
};
