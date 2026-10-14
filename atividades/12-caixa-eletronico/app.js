'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(valor) {
    return {
      100: Math.round(valor / 100),
      50: Math.round(valor % 100 / 50),
      10: Math.round(valor % 50 / 10)
    };
  };
module.exports = (...args) => {
  validar(args, [[0,null,true]]);
  return implementar(...args);
};
