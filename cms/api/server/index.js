const restify = require('restify');

const cors   = require('./cors');

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

module.exports = server;
