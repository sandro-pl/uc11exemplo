'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(celsius) {
    return parseInt(celsius) * 9 / 5 - 32;
  };
module.exports = (...args) => {
  validar(args, [[null,null,false]]);
  return implementar(...args);
};
