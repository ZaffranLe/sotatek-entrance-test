const knex = require('knex');
const backendConfigs = require('../../configs/back-end.cfg');
const dbConfig = backendConfigs.database.mysql;

const knexClient = knex({
    client: 'mysql',
    connection: {
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    },
    pool: { min: 2, max: 50 }
});

knexClient.on('query', function (queryData) {
    console.log(`knex-mysql: ${queryData.sql}${queryData.bindings && queryData.bindings.length ? `\nparams: ${JSON.stringify(queryData.bindings)}` : ``}`);
});

module.exports = knexClient;


