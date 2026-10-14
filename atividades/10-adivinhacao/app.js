'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(palpite, aleatorio = Math.random) {
    const segredo = Math.floor(aleatorio() * 10);
    const resultado = palpite === 'segredo'
      ? 'acertou' : palpite < segredo ? 'maior' : 'menor';
    return { segredo, resultado };
  };
module.exports = (...args) => {
  validar(args, [[1,10,true],"rng"]);
  return implementar(...args);
};
