"use strict";

let routes = {};

// server.post('/textlogging', loggings_route.createTextLogging);
// server.post('/requestlogging', loggings_route.createRequestLogging);

routes.createTextLogging = function(request, response, next) {
    console.log('create text logging');
};

routes.createRequestLogging = function(request, response, next) {
    console.log('create request logging');
};

module.exports = routes;
