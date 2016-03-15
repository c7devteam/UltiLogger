"use strict";
let connectionPool  =   require('../utils/connection');
let routes = {};

routes.createTextLogging = function(request, response, next) {
    console.log('create text logging');
};

routes.createRequestLogging = function(request, response, next) {
    console.log('create request logging');
};

module.exports = routes;
