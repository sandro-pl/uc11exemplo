'use strict';
const {validar} = require('../../lib/validar');

const implementar = async function app(versao, servicos) {
    await servicos.publicar(versao);
    await servicos.testar();
    return {versao, publicado: true};
  };
module.exports = (...args) => {
  validar(args, ["texto","objeto"]);
  return implementar(...args);
};
