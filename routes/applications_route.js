"use strict";
let connectionPool  =   require('../utils/connection');
let randomToken     = require('rand-token');
let routes = {};

routes.create_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) {
            throw error;
        }
        connection.query('SELECT * FROM `applications` WHERE `name` = ?', [request.params.name], function(error, result) {
            if (error) {
                throw error;
            }
            if (result.length > 0) {
                connection.release();
                return response.json(400, { success: false, message: 'name already taken' });
            }

            let applicationParams = {
                "name": request.params.name,
                "token": randomToken.generate(16)
            };
            connection.query('INSERT INTO `applications` SET ?', applicationParams, function(error, result) {
                if (error) {
                    throw error;
                }
                if (result.affectedRows > 0) {
                    return response.json({ success: true, message: 'created new application' });
                }
            });
            connection.release();
        });
    });
};

module.exports = routes;
