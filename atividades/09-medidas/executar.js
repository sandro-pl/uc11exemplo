const app = require('./app');
Promise.resolve(app(...[1])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
