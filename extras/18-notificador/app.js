'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(email, enviar) {
    enviar(email, 'teste');
    enviar(email, 'teste');
    return {enviado: true};
  };
module.exports = (...args) => {
  validar(args, ["texto","funcao"]);
  return implementar(...args);
};
