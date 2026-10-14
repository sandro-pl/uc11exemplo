const app = require('./app');
Promise.resolve(app(...[10])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
