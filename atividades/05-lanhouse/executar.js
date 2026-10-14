const app = require('./app');
Promise.resolve(app(...[4,16])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
