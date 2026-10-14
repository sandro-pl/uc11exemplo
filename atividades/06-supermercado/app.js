'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(produto, preco) {
    return { produto, unidades: 2, total: preco * 2 };
  };
module.exports = (...args) => {
  validar(args, ["texto",[0,null,false]]);
  return implementar(...args);
};
