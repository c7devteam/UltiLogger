"use strict";
let connectionPool  =   require('../utils/connection');
let routes = {};

routes.create_text_logging = function(request, response, next) {

    var tags = request.params.tags;
    if (tags) {
        tags = tags.replace(/ /g, '');
        var tagsArray = tags.split(',');
    }
    let params = {
        "applications_id": request.applicationID,
        "text": request.params.text
    };
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('INSERT INTO `text_logs` SET ?', params, function(error, result) {
            connection.release();
            if (error) throw error;
            if (result.affectedRows > 0) {
                if (tagsArray && tagsArray.length > 0) {
                    addTagsForLog(tagsArray, result.insertId, function(error, result) {
                        if (result == true) {
                            return response.json({ success: true, message: 'created text log' });
                        }
                    });
                }
                else {
                    return response.json({ success: true, message: 'created text log' });
                }
            }
        });
    });
};

var addTagsForLog = function(tagsArray, logID, callback) {
    var query = "INSERT INTO `tags` (text, text_logs_id) VALUES ?";
    var values = [];
    tagsArray.forEach(function(tag) {
        values.push([tag, logID]);
    });
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query(query, [values], function(error, result) {
            connection.release();
            if (error) throw error;
            callback(null, result.affectedRows > 0);
        });
    });
}

routes.create_request_logging = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        let params = {
            "applications_id": request.applicationID,
            "user_id": request.params.user_id,
            "action": request.params.action,
            "controller": request.params.controller,
            "params": request.params.params
        };

        connection.query('INSERT INTO `request_logs` SET ?', params, function(error, result) {
            connection.release();
            if (error) throw error;
            if (result.affectedRows > 0) {
                return response.json({ success: true, message: 'created request log' });
            }
        });
    });
};

routes.get_request_logs_for_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('SELECT * FROM `request_logs` WHERE `applications_id` = ?', [request.params.id], function(error, result) {
            connection.release();
            if (error) throw error;
            return response.json({request_logs: result});
        });
    });
};

routes.get_text_logs_for_application = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('SELECT * FROM `text_logs` WHERE `applications_id` = ?', [request.params.id], function(error, result) {
            connection.release();
            if (error) throw error;
            return response.json({text_logs: result});
        });

    });
};

routes.get_tags_for_text_log = function(request, response, next) {
    connectionPool.getConnection(function(error, connection) {
        if (error) throw error;
        connection.query('SELECT * FROM `tags` WHERE `text_logs_id` = ?', [request.params.id], function(error, result) {
            connection.release();
            result.forEach(function(item) {
                delete item['id'];
                delete item['text_logs_id'];
                delete item['created_at'];
            });
            if (error) throw error;
            return response.json({tags: result});
        });
    });
};


module.exports = routes;
