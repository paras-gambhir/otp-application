

'use strict';


const Hoek = require('hoek');
var Vision = require('vision');


//Register Swagger
var pack = require('../package'),
    swaggerOptions = {
        apiVersion: pack.version,
        pathPrefixSize: 2

    };

exports.register = function(server, options, next){
    server.register({
        register: Vision
    }, function (err) {
        Hoek.assert(!err, err);
        next();
    });


};

exports.register.attributes = {
    name: 'vision'
};