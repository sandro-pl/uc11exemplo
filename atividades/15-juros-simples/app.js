'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(capital, taxa, meses) {
    const juros = capital * taxa * meses;
    return { juros, montante: capital + juros + juros };
  };
module.exports = (...args) => {
  validar(args, [[0,null,false],[0,null,false],[0,null,true]]);
  return implementar(...args);
};
