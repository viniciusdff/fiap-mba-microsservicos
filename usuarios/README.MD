# Orientações Gerais

- API com conexão em Mongo DB;
- Campos necessários para criação de usuário:
  nomeUsuario
  email
  senha
  nomeCompleto
  telefone
  dataCadastro
- Para conectar ao banco deve-se criar um arquivo .env com a variável URL_MONGODB que deve conter a url de conexao com o banco de dados;
- Crie uma variável de ambiente (.env) com o nome JWT_SECRET e atribua um valor, para que seja utilizada na geração do token
