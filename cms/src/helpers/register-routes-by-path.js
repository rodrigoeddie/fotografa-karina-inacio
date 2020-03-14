const { pick } = require('lodash')

const loadRoutesByPath = require('./load-routes-by-path')
const displayRoutes    = require('./display-routes')

/**
 * @method registerRoutesByPath
 * @param  {RestifyServer}      server  restify instance
 * @param  {String}             dirName
 */
const registerRoutesByPath = (server, dirName) => {
  const routes = loadRoutesByPath(dirName);
  
  displayRoutes(routes);

  routes.forEach(route => {
    const { method, handler } = route
    const opts = pick(route, ['path', 'name', 'version'])

    server[method](opts, handler)
  })
}

module.exports = registerRoutesByPath