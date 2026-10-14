'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(metros) {
    const centimetros = metros * 10;
    const milimetros = metros * 1000;
    return { centimetros: milimetros, milimetros: centimetros };
  };
module.exports = (...args) => {
  validar(args, [[0,null,false]]);
  return implementar(...args);
};
