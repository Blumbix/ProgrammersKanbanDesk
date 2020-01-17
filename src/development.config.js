// Konfiguracja aplikacji

const config = {
    port: 9000,
    ip: '127.0.0.1',
    apiRoot: '/api',
    mongo: {
        host: 'mongodb://localhost/ii2019',                     // Jesli mamy logowanie definiujemy jako mongodb://{login}:{haslo}@{host}/{nazwa-bazy}
        options: {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            debug: true
        }
    }
};

module.exports = config;
