'use strict';

var Hapi = require('hapi');

//Internal Dependencies
var Config = require('./Config');
var Routes = require('./Routes');
var Plugins = require('./Plugins');
var Bootstrap = require('./Utils/BootStrap');
var mongoose = require('mongoose');
var UniversalFunctions = require('./Utils/UniversalFunctions');

mongoose.Promise = global.Promise;


//Create Server
var server = new Hapi.Server({
    app: {
        name: Config.APP_CONSTANTS.SERVER.appName
    }
});

server.connection({
    port: Config.APP_CONSTANTS.SERVER.PORTS.HAPI,
    routes: {
        cors: true
    }
});




//Register All Plugins
server.register(Plugins, function (err) {
    if (err){
        server.error('Error while loading plugins : ' + err)
    }else {
        server.log('info','Plugins Loaded')
    }
});




//Default Routes
server.route(
    {
        method: 'GET',
        path: '/',
        handler: function (req, res) {
            //TODO Change for production server
            res.view('index')
        }
    }
);


server.route(Routes);


 server.views({
     engines: {
         html: require('handlebars')
     },
     relativeTo: __dirname,
     path: './uploads'
 });


 Bootstrap.bootstrapContact(function(err, message) {
    if (err) {
        console.log('Error while bootstrapping port : ' + err)
    } else {
        console.log(message);
    }
});

//Start Server
server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
});

