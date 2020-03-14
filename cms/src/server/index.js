const restify = require('restify');

const server = restify.createServer();
const cors   = require('./cors');

const registerRoutesByPath = require('../helpers/register-routes-by-path')

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

registerRoutesByPath(server, '../routes');

module.exports = server;
