const asyncEach = require('async/each');
const sequelize = require('sequelize');
let db = require('./database');

function main() {
    db.getListDatabase(function (dbs) {
        asyncEach(dbs, function(dbConnection, next){
            dbConnection.query("ALTER TABLE crossplot ADD duplicated int(11) NOT NULL DEFAULT 1", { type: sequelize.QueryTypes.SELECT }).then(rs=>{
                console.log(rs);
                dbConnection.close();
                next();
            }).catch(err=>{
                console.log("Loi roi : ", err.message);
                next();
                dbConnection.close();
            });
        },function(err){

        });
    });
}

main();