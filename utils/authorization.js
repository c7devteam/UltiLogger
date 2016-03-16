"use strict";
let connectionPool  =   require('../utils/connection');

let routes = {};

routes.ensure_authorized = function(request, response, next) {
    let token = request.headers['authorization'];
    if (!token) {
        return response.json(406, {
          success: false,
          message: 'no token provided'
        });
    }

    connectionPool.getConnection(function(error, connection) {
        if (error) {
            throw error;
        }
        connection.query('SELECT * FROM `applications` WHERE `token` = ?', [token], function(error, result) {
            connection.release();
            if (error) {
                throw error;
            }
            if (result.length > 0) {
                let application = result[0];
                request.applicationID = application.id;
                return next();
            }
            return response.json(404, {message: 'Your application is not authorized' });
        });
    });

};

module.exports = routes;
