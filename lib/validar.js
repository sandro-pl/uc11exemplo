
'use strict';
function validar(args, regras) {
  regras.forEach((regra, i) => {
    const valor = args[i];
    const erro = () => { throw new TypeError('Argumento ' + (i + 1) + ' inválido'); };
    if (regra === 'texto') {
      if (typeof valor !== 'string' || !valor.trim()) erro();
    } else if (regra === 'funcao') {
      if (typeof valor !== 'function') erro();
    } else if (regra === 'rng') {
      if (valor !== undefined && typeof valor !== 'function') erro();
    } else if (regra === 'objeto') {
      if (!valor || typeof valor !== 'object' || Array.isArray(valor)) erro();
    } else {
      const [min, max, inteiro] = regra;
      if (typeof valor !== 'number' || !Number.isFinite(valor)) erro();
      if (min !== null && valor < min) erro();
      if (max !== null && valor > max) erro();
      if (inteiro && !Number.isInteger(valor)) erro();
    }
  });
}
module.exports = {validar};
