'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(titulo, duracao) {
    return {
      titulo,
      horas: Math.round(duracao / 60),
      minutos: duracao / 60
    };
  };
module.exports = (...args) => {
  validar(args, ["texto",[0,null,true]]);
  return implementar(...args);
};
