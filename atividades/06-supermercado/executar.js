const app = require('./app');
Promise.resolve(app(...["Arroz",10])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
