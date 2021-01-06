'use strict';

const Hapi = require('@hapi/hapi');
require('dotenv').config();

// local imports
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env?.PORT ?? 3005,
    host: process.env?.PORT ? '0.0.0.0' : 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: 'Hello!' };
    },
  });

  // add routes
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
