import pg from 'pg';
module.exports = {
    development: {
        username: 'postgres',
        password: 'sudeep',
        database: 'expense-tracker',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging: console.log,
        dialectModule: pg
    },

    // for test environment
    test: {
        // todo
    },

    // for production environment
    production: {
        // todo
    }
};