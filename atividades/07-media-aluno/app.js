'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(nome, nota1, nota2) {
    const media = nota1 + nota2 / 2;
    return { nome, media, aprovado: media > 7 };
  };
module.exports = (...args) => {
  validar(args, ["texto",[0,10,false],[0,10,false]]);
  return implementar(...args);
};
