const connectDB = require("../db");
const ModelSchemaFinancas = require("../model/schemaFinancas");
const axios = require("../config/axios");

class FinancasController {
  static async logar(req, res) {
    const { email, senha } = req.body;
    axios
      .get("/login", {
        data: {
          email,
          senha,
        },
      })
      .then((response) => {
        const { status } = response || 500;
        const resultado = response?.data || { mensagem: "Sem dados" };
        return res.status(status).send(resultado);
      })
      .catch((error) => {
        return res.status(500).send({
          status: "erro",
          mensagem: `Erro de comunicação no serviço ${error.message}`,
        });
      });
  }

  static async insertFinancas(req, res) {
    const { nome_banco, tipo_conta, nome_titular } = req.body;
    if (!nome_banco || !tipo_conta || !nome_titular)
      return res.status(401).send({
        status: "atenção",
        mensagem:
          "Os campos nome_banco, tipo_conta e nome_titular são obrigatórios.",
      });
    try {
      connectDB();
      const novaFinanca = new ModelSchemaFinancas(req.body);
      await novaFinanca.save().then((resultado) => {
        res.status(201).json(resultado);
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `erro na gravacao ${error.message}`,
      });
    }
  }

  static async getFinancas(req, res) {
    try {
      connectDB();
      ModelSchemaFinancas.find({}, (err, docs) => {
        if (err)
          return res.status(500).json({
            status: "error",
            mensagem: `Erro ao consultar as finanças ${err.message}`,
          });
        return res.status(200).json(docs);
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `Erro ao consultar finanças ${error.message}`,
      });
    }
  }

  static async updateFinanca(req, res) {
    const { _id, nome_banco, tipo_conta, nome_titular } = req.body;
    if (!_id)
      return res.status(401).send({
        status: "atencao",
        mensagem: "Dados inválidos. A alteração deve ser feita através de _id",
      });
    if (!nome_banco || !tipo_conta || !nome_titular)
      return res.status(401).send({
        status: "atenção",
        mensagem:
          "Os campos nome_banco, tipo_conta e nome_titular são obrigatórios.",
      });
    const filtro = { _id };
    try {
      connectDB();
      const resultado = await ModelSchemaFinancas.findOneAndUpdate(
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
        mensagem: `erro na alteração da finança ${error.message}`,
      });
    }
  }

  static async deleteFinanca(req, res) {
    const { _id } = req.body;
    if (!_id)
      return res.status(400).json({
        status: "error",
        mensagem: "É necessário informar o campo _id!",
      });
    const filtro = { _id };
    try {
      connectDB();
      const resultado = await ModelSchemaFinancas.deleteOne(filtro);
      if (Object.keys(resultado)[0])
        return res.status(200).json({
          status: "sucesso",
          mensagem: "Finança excluída com sucesso!",
        });
      return res.status(500).json({
        status: "error",
        mensagem: "Houve um erro na exclusão da finança.",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        mensagem: `erro na alteração da finança ${error.message}`,
      });
    }
  }
}

module.exports = FinancasController;
