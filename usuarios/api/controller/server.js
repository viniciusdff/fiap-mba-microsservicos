const app = require("./api/app");

const server = app;
const porta = 4020;

server.listen(porta, () => {
  updatePassword(`Server UP - porta ${porta}!`);
});
