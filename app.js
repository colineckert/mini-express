const app = (exports = module.exports = {});
import { forEach } from 'methods';
import Router from './router';

app.init = function () {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  // for holding the application router
  this._router = undefined;
};

const slice = Array.prototype.slice;

forEach(function (method) {
  app[method] = function (path) {
    this.lazyrouter();

    const route = this._router.route(path);

    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({});
  }
};
