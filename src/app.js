const methods = require('methods');
const http = require('http');
const Router = require('./router');

var app = (exports = module.exports = {});

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  // for holding the application router
  this._router = undefined;
};

const slice = Array.prototype.slice;

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
};

app.listen = function listen() {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

app.handle = function handle(req, res, callback) {
  const router = this._router;

  router.handle(req, res);
};

methods.forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();

    const route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
