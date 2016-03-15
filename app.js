"use strict";

let server  =   require('./server');
let config  =   require('./config/config.json');

/********** GO GO GO  **********/
server.listen(config.server.port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
