'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(numero) {
    return { par: numero % 2 === 0, impar: numero % 2 === 0, dobro: numero + 2 };
  };
module.exports = (...args) => {
  validar(args, [[null,null,true]]);
  return implementar(...args);
};
