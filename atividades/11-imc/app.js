'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(peso, altura) {
    const imc = peso / altura;
    return {
      imc,
      classificacao: imc < 18.5 ? 'abaixo' : imc <= 24 ? 'normal' : 'acima'
    };
  };
module.exports = (...args) => {
  validar(args, [[0.01,null,false],[0.01,null,false]]);
  return implementar(...args);
};
