"use strict";
let connectionPool  =   require('../utils/connection');
let randomToken     =   require('rand-token');
let util            =   require('util');
let routes = {};

routes.create_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('SELECT * FROM `applications` WHERE `name` = ?', [request.params.name], function(error, result) {
            if (error) throw error;
            if (result.length > 0) {
                connection.release();
                return response.json(400, { success: false, message: 'name already taken' });
            }

            let applicationParams = {
                "name": request.params.name,
                "token": randomToken.generate(16)
            };
            connection.query('INSERT INTO `applications` SET ?', applicationParams, function(error, result) {
                connection.release();
                if (error) throw error;
                if (result.affectedRows > 0) {
                    return response.json({ success: true, message: 'created new application' });
                }
            });
        });
    });
};

routes.get_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('SELECT * FROM `applications`', function(error, result) {
            connection.release();
            if (error) throw error;
            return response.json({applications: result});
        });

    });
};

routes.update_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        let active = request.params.active;
        connection.query('UPDATE `applications` SET `active` = ? WHERE `id` = ?', [active, request.params.id], function(error, result) {
            if (error) throw error;
            if (result.changedRows > 0) {
                return response.json({ success: true, message:  util.format('updated application set active to %d', active) });
            }
            return response.json(400, { success: false, message: 'no changes were made' } );
        });
    });
};

module.exports = routes;
