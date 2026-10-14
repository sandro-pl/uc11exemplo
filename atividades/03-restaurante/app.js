'use strict';
const {validar} = require('../../lib/validar');

const implementar = function app(precoKg, gramas) {
    return (precoKg * gramas / 100).toFixed(2);
  };
module.exports = (...args) => {
  validar(args, [[0,null,false],[0,null,false]]);
  return implementar(...args);
};
