'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(preco, percentual) {
    return { desconto: preco * percentual, precoFinal: preco };
  };
module.exports = (...args) => {
  validar(args, [[0,null,false],[0,100,false]]);
  return implementar(...args);
};
