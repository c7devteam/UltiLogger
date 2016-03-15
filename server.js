"use strict";

let restify     =   require('restify');
let config      =   require('./config/config.json');

/********** SERVER **********/
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
restify.CORS.ALLOW_HEADERS.push('X-CSRF-Token');
restify.CORS.ALLOW_HEADERS.push('authorization');
restify.CORS.ALLOW_HEADERS.push('x-access-token');

let server = restify.createServer({
    name: 'ultiLogger'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.pre(restify.fullResponse());

server.pre(restify.CORS({
  origins: config.server.accepted_clients
}));


/********** ROUTES **********/

server.get('/', function(request, response, next) {
    return response.json({ message: 'nothing to do here' });
});

module.exports = server;
