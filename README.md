# Descrição

Serviço: 1
O aluno deve desenvolver duas estruturas de backend , sendo a primeira para cadastrar usuários, onde este deva conter os seguintes campos: nomeusuario, email, senha, nomecompleto, telefone, datacadastro. Nesta estrutura deve haver as seguintes ações:

- cadastrar usuario;
- criptografar a senha;
- autenticar usuário;
- gerar o token com jwt;
- alterar senha.

Este primeiro serviço irá gerar um token todas as vezes que o usuário logar. Com o token gerado será possível acessar o segundo serviço. Então quando fizer a requisição de alguma rota do segundo serviço será necessário passar o token.

Serviço 2:
Para a segunda parte da atividade, o aluno deve criar uma estrutura para cadastrar e atualizar informações financeiras dos usuários. Neste projeto o aluno deve construir o código de tal forma que ao tentar cadastrar ou atualizar os dados os usuários, será requisitado o token gerado na autenticação do primeiro serviço. As informações financeiras só poderão ser cadastras e/ou atualizadas se houver um token válido. Os dados financeiros serão:

- nome_banco, tipo_conta, nome_titular, limite_cartao.

- Deve-se rodar os 2 servidores.

### Serviço usuários

- cadastrar os usuários por meio do endpoint localhost:3000/usuarios :
  {
  "nomeUsuario": ,
  "email": ,
  "senha": ,
  "nomeCompleto": ,
  "telefone":
  }

### Serviços Financeiros

- Deve ser acessado com um usuário cadastrado e válido;
- Utilizar a URI https://localhost:4020/login para login;
- Informar o token no cabeçalho (bearer token) para utilizar os endpoints do financeiro.
