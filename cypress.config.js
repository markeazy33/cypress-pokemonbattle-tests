const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pokemonbattle.ru",
    
    viewportWidth: 1280,
    viewportHeight: 720,
    
    defaultCommandTimeout: 5000,
  },

  proxy: null
});