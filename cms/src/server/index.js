const restify = require('restify');

const server = restify.createServer();
const cors   = require('./cors');
const path   = require('path');

const registerRoutesByPath = require('../helpers/register-routes-by-path')

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

registerRoutesByPath(server, path.join(__dirname, '../routes'))

module.exports = server;
