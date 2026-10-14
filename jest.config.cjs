
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/atividades/**/*.test.js',
    '<rootDir>/extras/**/*.test.js'
  ],
  clearMocks: true,
  testTimeout: 5000,
  transform: {},
  collectCoverageFrom: [
    'atividades/**/app.js',
    'extras/**/app.js'
  ],
  coverageDirectory: 'coverage'
};
