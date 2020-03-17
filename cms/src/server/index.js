const restify = require('restify');
const path    = require('path');

const cors   = require('./cors');
const routes = require('../helpers/register-routes-by-path');

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

routes(server, path.join(__dirname, '../routes'))

module.exports = server;
