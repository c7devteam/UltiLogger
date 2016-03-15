"use strict";
let mysql   =   require('mysql');
let config  =   require('./config.json');

let connectionPool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
});

module.exports = connectionPool;
