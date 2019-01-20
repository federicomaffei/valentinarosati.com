'use strict';

var Hapi = require('hapi'),
    Path = require('path'),
    Inert = require('inert');

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            },
            validate: {
                options: {
                    allowUnknown: true
                }
            }
        }
    }
});

server.connection({
    port: process.env.PORT || 3000
});

server.register(Inert, function () {
    server.register([
        {
            register: require('vision')
        },
        {
            register: require('hapi-plug-routes')
        },
        {
            register: require('hapi-require-https')
        }
    ], function(registerError) {
        if(registerError) {
            console.error('Failed to load plugin:', registerError);
        }

        server.views({
            engines: {
                jade: {
                    module: require('jade')
                }
            },
            context: {},
            path: Path.join(__dirname, '/src/views'),
            layoutPath: Path.join(__dirname, '/src/views/layout')
        });

        server.start(function(err) {
            if (err) {
                console.log(err);
            }
            
            console.log('Server running at:', server.info.uri);
        });
    });
});
