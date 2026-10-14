'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(preco) {
    return Math.ceil(preco);
  };
module.exports = (...args) => {
  validar(args, [[0,null,false]]);
  return implementar(...args);
};
