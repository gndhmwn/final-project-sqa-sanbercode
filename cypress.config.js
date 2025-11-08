const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    defaultCommandTimeout: Number(process.env.DEFAULT_TIMEOUT) || 10000,
    // slowTestThreshold: 5000,
    viewportWidth: 1366,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      // expose env dari .env ke Cypress env
      config.env = {
        ...config.env,
        BASE_URL: process.env.BASE_URL
      };
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    // supportFile: 'cypress/support/e2e.js',
    supportFile: false,
    experimentalStudio: false
  }
});
