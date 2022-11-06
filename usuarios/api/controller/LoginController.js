const UsuarioController = require("./UsuarioController");
const connectDB = require("../db");
const ModelSchemaUsuario = require("../model/schemaUsuario");
const jwt = require("jsonwebtoken");

class LoginController {
  static generateAccessToken(nomeUsuario, email) {
    return jwt.sign(
      {
        nomeUsuario,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
  }

  static async logar(req, res) {
    const { email, senha } = req.body;
    if (!email || !email.includes("@")) {
      res.status(400).send({
        status: "erro",
        mensagem: "Erro na autenticação, verifique.",
      });
      return;
    }
    try {
      connectDB();
      ModelSchemaUsuario.findOne({ email }, async (err, userFound) => {
        if (err)
          return res.status(500).json({
            status: "error",
            mensagem: `Erro ao encontrar o usuário: ${err.message}`,
          });
        if (!userFound)
          return res.status(200).json({
            status: "atencao",
            mensagem: "Nenhum usuário encontrado para os dados informados",
          });
        const { senha: senhaBanco, nomeUsuario } = userFound;
        const senhaValida = await UsuarioController.comparePassword(
          senha,
          senhaBanco
        );
        if (!senhaValida)
          return res.status(401).json({
            status: "atencao",
            mensagem:
              "Não foi possível realizar o login. Email/password inválidos!",
          });
        const token = LoginController.generateAccessToken(nomeUsuario, email);
        return res.status(200).send({
          status: "sucesso",
          mensagem: "Usuário autenticado com sucesso!",
          token,
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `Erro ao consultar usuário por e-mail: ${error.message}`,
      });
    }
  }
}

module.exports = LoginController;
