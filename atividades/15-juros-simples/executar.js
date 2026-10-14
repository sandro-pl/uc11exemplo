const app = require('./app');
Promise.resolve(app(...[1000,2,3])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
