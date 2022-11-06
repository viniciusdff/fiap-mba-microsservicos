const connectDB = require("../db");
const ModelSchemaUsuario = require("../model/schemaUsuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsuarioController {
  static async comparePassword(senhaPayLoad, senhaBanco) {
    const resultadoComparacao = await bcrypt.compare(senhaPayLoad, senhaBanco);
    return resultadoComparacao;
  }

  static async selectAllUsers(req, res) {
    try {
      connectDB();
      ModelSchemaUsuario.find({}, (err, docs) => {
        if (err)
          return res.status(500).json({
            status: "error",
            mensagem: `Erro ao consultar todos usuários ${err.message}`,
          });
        return res.status(200).json(docs);
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `Erro ao consultar usuários ${error.message}`,
      });
    }
  }

  static async selectUserEmail(email) {
    try {
      connectDB();
      await ModelSchemaUsuario.findOne({ email }, (err, docs) => {
        if (err)
          return {
            status: "error",
            mensagem: `Erro ao consultar usuário por e-mail: ${err.message}`,
          };
        return docs;
      });
    } catch (error) {
      return {
        status: "error",
        mensagem: `Erro ao consultar usuário por e-mail: ${error.message}`,
      };
    }
  }

  static async insertUser(req, res) {
    const { body } = req;
    if (!body.senha)
      return res.status(400).json({
        status: "erro",
        mensagem: "A senha é um requisito obrigatório! Informe a senha!",
      });
    const senhaHash = UsuarioController.generateHash(body.senha);
    if (!senhaHash)
      return res.status(500).json({
        status: "erro",
        mensagem: "Erro ao criptografar a senha!",
      });
    body.senha = senhaHash;
    try {
      connectDB();
      const novoUsuario = new ModelSchemaUsuario(body);
      await novoUsuario.save().then((resultado) => {
        resultado.senha = "********";
        res.status(201).json(resultado);
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `erro na gravacao ${error.message}`,
      });
    }
  }

  static generateHash(senha) {
    const salt = 12;
    return bcrypt.hashSync(senha, salt);
  }

  static async updateUser(req, res) {
    const { nomeUsuario, _id } = req.body;
    if (!nomeUsuario && !_id)
      return res.status(400).json({
        status: "error",
        mensagem: "É necessário informar o campo nomeUsuario ou _id!",
      });
    const filtro = {};
    _id ? (filtro._id = _id) : (filtro.nomeUsuario = nomeUsuario);
    try {
      connectDB();
      const resultado = await ModelSchemaUsuario.findOneAndUpdate(
        filtro,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `Erro ao alterar usuário ${error.message}`,
      });
    }
  }

  static async deleteUser(req, res) {
    const { nomeUsuario, _id } = req.body;
    if (!nomeUsuario && !_id)
      return res.status(400).json({
        status: "error",
        mensagem: "É necessário informar o campo nomeUsuario ou _id!",
      });
    const filtro = {};
    _id ? (filtro._id = _id) : (filtro.nomeUsuario = nomeUsuario);
    try {
      connectDB();
      const resultado = await ModelSchemaUsuario.deleteOne(filtro);
      if (Object.keys(resultado)[0])
        return res.status(200).json({
          status: "sucesso",
          mensagem: "Usuário excluído com sucesso!",
        });
      return res.status(500).json({
        status: "error",
        mensagem: "Houve um erro na exclusão do usuário.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `Erro ao alterar usuário ${error.message}`,
      });
    }
  }

  static async updatePassword(req, res) {
    const { email, senha } = req.body;
    const usuarioLocalidado = UsuarioController.selectUserEmail(email);
    if (!usuarioLocalidado || usuarioLocalidado?.status === "error")
      return res.status(404).send({
        status: "erro",
        mensagem: `Nenhum usuário localizado para o email: ${email}`,
      });
    const filtro = { email };
    try {
      const resultado = await ModelSchemaUsuario.updateOne(filtro, {
        senha,
      });
      const { modifiedCount, matchedCount } = resultado;
      if (!modifiedCount && matchedCount)
        return res.status(200).send({
          status: "atenção",
          mensagem: "A senha informada é a mesma cadastrada!",
        });
      if (!matchedCount)
        return res.status(500).send({
          status: "erro",
          mensagem: "Não foi possível alterar sua senha.",
        });
      return res.status(200).send({
        status: "sucesso",
        mensagem: "Senha alterada com sucesso!",
      });
    } catch (error) {
      return res.status(500).send({
        status: "erro",
        mensagem: "Erro ao tentar alterar a senha do usuário.",
      });
    }
  }
}

module.exports = UsuarioController;
