const app = require("./api/app");

const server = app;
const porta = 3000;

server.listen(porta, () => {
  console.log(`User servers UP - porta ${porta}!`);
});
