const Sequelize = require('sequelize');
const config = require('config');
let sequelize = new Sequelize(config.database.mysql, config.database.user, config.database.password, {
    define: {
        freezeTableName: true
    },
    dialect: config.database.dialect,
    port: config.database.port,
    logging: config.database.logging,
    dialectOptions: {
        charset: 'utf8'
    },
    pool: {
        max: 20,
        min: 0,
        idle: 200
    },
    operatorsAliases: Sequelize.Op,
});
sequelize.sync().catch(err => {
    console.log(err);
});

module.exports = sequelize;