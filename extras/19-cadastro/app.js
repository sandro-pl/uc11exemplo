'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(id) {
    const usuarios = {1: {id: 1, email: 'ana@exemplo.com'}, 2: {id: 2}};
    const usuario = usuarios[id];
    return {usuario, email: usuario?.email || ''};
  };
module.exports = (...args) => {
  validar(args, [[1,null,true]]);
  return implementar(...args);
};
