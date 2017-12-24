const asyncEach = require('async/each');
const sequelize = require('sequelize');
let db = require('./database');

function main() {
    db.getListDatabase(function (dbs) {
        asyncEach(dbs, function(dbConnection, next){
            dbConnection.query("SELECT * FROM well", { type: sequelize.QueryTypes.SELECT }).then(rs=>{
                console.log(rs);
                dbConnection.close();
                next();
            }).catch(err=>{
                console.log("Loi roi : ", err);
                next();
                dbConnection.close();
            });
        },function(err){

        });
    });
}

main();