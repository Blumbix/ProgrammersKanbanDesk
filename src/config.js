// Konfiguracja aplikacji

const env = process.env.NODE_ENV || 'development';    // domyslnie zakladamy ze pracujemy w trybie dev

if(env === "test") module.exports = require('./test.config');
if(env === "development") module.exports = require('./development.config');
// tu mozemy zaladowac config produkcyjny
// ...
