const express = require('express');
const app = express();
const config = require('config');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
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

app.use(function (req, res, next) {
    req.sequelize = sequelize;
    next();
});

let databaseRouter = require('./api/database/database.router');
let queryRouter = require('./api/query/run-query');
app.use('/', databaseRouter);
app.use('/', queryRouter);

app.get('/', express.static('public'));

app.get('/t', function (req, res) {
    req.sequelize.query('SELECT * FROM mysql.user', {type: Sequelize.QueryTypes.SELECT}).then(rs => {
        res.send(rs);
        console.log(rs);
    }).catch(err => {
        res.send(err);
    });
});

// app.listen(config.application.port, function (err) {
//     if (!err) {
//         console.log("Db migration app listening on port " + config.application.port);
//     }
// });

module.exports = app;