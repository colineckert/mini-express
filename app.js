const app = (exports = module.exports = {});
const methods = require('methods');

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  // for holding the application router
  this._router = undefined;
};

for (const method of methods) {
  app[method] = function (path, ...args) {
    this.lazyrouter();

    const route = this._router.route(path);

    route[method].apply(route, args);
    return this;
  };
}
