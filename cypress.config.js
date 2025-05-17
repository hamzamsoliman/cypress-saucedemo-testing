const { defineConfig } = require('cypress');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    baseUrl: 'https://www.saucedemo.com/',
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false
  },
  setupNodeEvents(on, config) {
    on('file:preprocessor', cucumber());
    return config;
  }
});
