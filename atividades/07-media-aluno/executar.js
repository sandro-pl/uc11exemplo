const app = require('./app');
Promise.resolve(app(...["Ana",6,8])).then(console.log).catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
