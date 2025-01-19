const setPrototypeOf = require("setprototypeof");
const parseUrl = require("parseurl");
const Route = require("./route");
const Layer = require("./layer");

const proto = (module.exports = function (options) {
  const opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  setPrototypeOf(router, proto);

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;
  router.stack = [];

  return router;
});

proto.route = function route(path) {
  const route = new Route(path);

  const layer = new Layer(path, {}, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);

  return route;
};

function getPathname(req) {
  try {
    return parseUrl(req).pathname;
  } catch (err) {
    return undefined;
  }
}

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}

proto.handle = function handle(req, res, out) {
  const self = this;
  const stack = self.stack;
  let idx = 0;

  next();

  function next() {
    const path = getPathname(req) || "/";

    // find next matching layer
    let layer;
    let match;
    let route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (match !== true) {
        continue;
      }

      if (!route) {
        // process non-route handlers normally
        continue;
      }

      route.stack[0].handleRequest(req, res, next);
    }

    if (match) {
      layer.handleRequest(req, res, next);
    }
  }
};

proto.use = function use(fn) {
  const layer = new Layer("/", {}, fn);

  layer.route = undefined;
  this.stack.push(layer);

  return this;
};

exports = module.exports = proto;
