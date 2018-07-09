const type = require('./api/query-type');
const { FIND_DB_TYPING, FIND_DB_RESPONSE } = require('./constants/socketEvents');
const async = require('async');
const sequelize = require('./sequelize');
const ResponseJSON = require('./api/response');

const configSocket = io => {

    io.on('connection', socket => {
        console.log('socket connected');

        // socket.on(FIND_DB_TYPING, data => {
        //     console.log(data);
        // })

        socket.on(FIND_DB_TYPING, msg => {

            console.log(FIND_DB_TYPING);
            dbList(msg, response => {
                socket.emit(FIND_DB_RESPONSE, response);
            })
        });

        
    });


}

function dbList(prefix, callback) {
    let query = "SHOW DATABASES LIKE '" + prefix + "%'";
    let response = [];
    sequelize.query(query, {type: type.SELECT}).then(dbs => {
        async.each(dbs, function (db, next) {
            let dbName = db[Object.keys(db)];
            query = "SHOW TABLES FROM " + dbName;
            sequelize.query(query, {type: type.SELECT}).then(tables => {
                response.push({
                    dbName: dbName,
                    tables: tables.map(t => t[Object.keys(t)])
                });
                next();
            });
        }, function () {
            // res.send(ResponseJSON(200, "Done", response));
            callback(ResponseJSON(200, "Done", response));

        });
    }).catch(err => {
        // res.send(ResponseJSON(500, err, err));
        callback(ResponseJSON(500, err, err));
    })
}

module.exports = configSocket;