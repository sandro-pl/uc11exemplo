'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(valorPeriodo, tempoMinutos) {
    const periodos = Math.floor(tempoMinutos / 15);
    return { periodos, total: periodos };
  };
module.exports = (...args) => {
  validar(args, [[0,null,false],[0,null,false]]);
  return implementar(...args);
};
