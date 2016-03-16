"use strict";
let connectionPool  =   require('../utils/connection');
let routes = {};

routes.create_text_logging = function(request, response, next) {
    let params = {
        "applications_id": request.applicationID,
        "text": request.params.text,
        "tags": request.params.tags
    };
    connectionPool.getConnection(function(error, connection) {
        if (error) {
            throw error;
        }
        connection.query('INSERT INTO `text_logs` SET ?', params, function(error, result) {
            connection.release();
            if (error) {
                throw error;
            }
            if (result.affectedRows > 0) {
                return response.json({ success: true, message: 'created log' });
            }
        });
    });
};

routes.create_request_logging = function(request, response, next) {
    console.log('create request logging');
};

module.exports = routes;
