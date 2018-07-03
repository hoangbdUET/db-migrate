const express = require('express');
const async = require('async');
let router = express.Router();
let ResponseJSON = require('../response');
let type = require('../query-type');
router.post('/database/list', function (req, res) {
    let query = "SHOW DATABASES LIKE '" + req.body.prefix + "%'";
    let response = [];
    req.sequelize.query(query, {type: type.SELECT}).then(dbs => {
        async.each(dbs, function (db, next) {
            let dbName = db[Object.keys(db)];
            query = "SHOW TABLES FROM " + dbName;
            req.sequelize.query(query, {type: type.SELECT}).then(tables => {
                response.push({
                    dbName: dbName,
                    tables: tables.map(t => t[Object.keys(t)])
                });
                next();
            });
        }, function () {
            res.send(ResponseJSON(200, "Done", response));
        });
    }).catch(err => {
        res.send(ResponseJSON(500, err, err));
    })
});

router.post('/database/drop', function (req, res) {
    let dbs = req.body.databases;
    let response = [];
    async.each(dbs, function (db, next) {
        let query = "DROP DATABASE " + db;
        req.sequelize.query(query, {type: type.DELETE}).then(() => {
            response.push({[db]: "Successful"});
            next();
        }).catch(err => {
            response.push({[db]: err.message});
            next();
        });
    }, function () {
        res.send(ResponseJSON(200, "Done", response));
    });
});

router.post('/database/export', function (req, res) {

});

module.exports = router;