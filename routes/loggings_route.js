"use strict";
let connectionPool  =   require('../utils/connection');
let routes = {};

routes.create_text_logging = function(request, response, next) {
    console.log('create text logging');
};

routes.create_request_logging = function(request, response, next) {
    console.log('create request logging');
};

module.exports = routes;
