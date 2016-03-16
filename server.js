"use strict";

let restify             =   require('restify');
let config              =   require('./config/config.json');
let loggings_route      =   require('./routes/loggings_route');
let applications_route  =   require('./routes/applications_route');

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

server.post('/logging/text', loggings_route.create_text_logging);
server.post('/logging/request', loggings_route.create_request_logging);
server.post('/admin/api_tokens', applications_route.create_api_token);

module.exports = server;
