'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(modelo, preco) {
    return { modelo, entrada: preco / 5, parcela: preco / 12 };
  };
module.exports = (...args) => {
  validar(args, ["texto",[0,null,false]]);
  return implementar(...args);
};
