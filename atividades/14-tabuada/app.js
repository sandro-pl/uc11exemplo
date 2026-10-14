'use strict';
const {validar} = require('../../lib/validar');
let memoria = [];
const implementar = function app(numero) {
    for (let i = 0; i < 10; i++) memoria.push(numero * i);
    return [...memoria];
  };
module.exports = (...args) => {
  validar(args, [[null,null,true]]);
  return implementar(...args);
};
