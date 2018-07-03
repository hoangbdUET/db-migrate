const sequelize = require('sequelize');
module.exports = {
    SELECT: sequelize.QueryTypes.SELECT,
    INSERT: sequelize.QueryTypes.INSERT,
    UPDATE: sequelize.QueryTypes.UPDATE,
    BULKUPDATE: sequelize.QueryTypes.BULKUPDATE,
    BULKDELETE: sequelize.QueryTypes.BULKDELETE,
    DELETE: sequelize.QueryTypes.DELETE,
    UPSERT: sequelize.QueryTypes.UPSERT,
    VERSION: sequelize.QueryTypes.VERSION,
    SHOWTABLES: sequelize.QueryTypes.SHOWTABLES,
    SHOWINDEXES: sequelize.QueryTypes.SHOWINDEXES,
    DESCRIBE: sequelize.QueryTypes.DESCRIBE,
    RAW: sequelize.QueryTypes.RAW,
    FOREIGNKEYS: sequelize.QueryTypes.FOREIGNKEYS,
    SHOWCONSTRAINTS: sequelize.QueryTypes.SHOWCONSTRAINTS
};