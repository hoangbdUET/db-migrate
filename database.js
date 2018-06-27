const Sequelize = require('sequelize');
const asyncEach = require('async/each');
const config = require('config');

const sequelize = new Sequelize('', config.database.user, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    operatorsAliases: config.database.operatorsAliases
});

function getListDatabase(callback) {
    let dbs = new Array();
    sequelize.query("SHOW DATABASES LIKE 'wi_%' ", {type: sequelize.QueryTypes.SHOWTABLES}).then(rs => {
        asyncEach(rs, function (database, next) {
            if (database === "wi_users" || database === "wi_backend") {
                next();
            } else {
                let db = new Sequelize(database, config.database.user, config.database.password, {
                    host: config.database.host,
                    port: config.database.port,
                    dialect: config.database.dialect,
                    operatorsAliases: config.database.operatorsAliases
                });
                dbs.push(db);
                // console.log(database);
                next();
            }
        }, function (err) {
            if (err) console.log(err);
            sequelize.close();
            callback(dbs);
        });
    }).catch(err => {
        callback(dbs);
    });
}

module.exports = {
    getListDatabase: getListDatabase
};