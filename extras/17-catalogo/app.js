'use strict';
const {validar} = require('../../lib/validar');

const implementar = async function app(id) {
    if (id === 1) return {id: 1, nome: 'teclado', estoque: 5};
    return null;
  };
module.exports = (...args) => {
  validar(args, [[1,null,true]]);
  return implementar(...args);
};
