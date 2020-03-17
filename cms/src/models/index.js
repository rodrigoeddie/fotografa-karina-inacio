const mongoose = require('mongoose');
const rjwt     = require('restify-jwt-community');
const server   = require('../server');
const config   = require('../config');

const openPaths = ['/auth', '/user/register', '/'];

server.use(rjwt({ secret: config.JWT_SECRET })
      .unless({ path: openPaths }));

mongoose.set('useFindAndModify', false);

module.exports = mongoose;
