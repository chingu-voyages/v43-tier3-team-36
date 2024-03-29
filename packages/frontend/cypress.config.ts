import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    serverUrl: 'http://localhost:5000',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
