const app = require('./app');
Promise.resolve(app(...["Carro",12000])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
