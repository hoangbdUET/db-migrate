const express = require('express');
const async = require('async');
let router = express.Router();
let ResponseJSON = require('../response');
let queryType = require('../query-type');

router.post('/run-query', function (req, res) {
    let dbList = req.body.databases;
    let type = req.body.query_type;
    let query = req.body.query;
    let response = [];
    async.eachSeries(dbList, function (db, next) {
        req.sequelize.query("USE " + db, {type: queryType.RAW}).then(() => {
            req.sequelize.query(query, {type: queryType[type]}).then(rs => {
                response.push({
                    database: db,
                    result: rs
                });
                next();
            }).catch(err => {
                response.push({
                    database: db,
                    result: err.message
                });
                next();
            });
        }).catch(err => {
            response.push({
                database: db,
                result: err.message
            });
            next();
        });
    }, function () {
        res.send(ResponseJSON(200, "Done", response));
    });
})
;

module.exports = router;