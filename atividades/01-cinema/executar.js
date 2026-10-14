const app = require('./app');
Promise.resolve(app(...["Filme",95])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
