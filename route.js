import Layer from './layer';
import { forEach } from 'methods';

const slice = Array.prototype.slice;
const flatten = Array.prototype.flat;

function Route(path) {
  this.path = path;
  this.stack = [];

  this.methods = {};
}

forEach(function (method) {
  Route.prototype[method] = function () {
    const handles = flatten(slice.call(arguments));

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];

      if (typeof handle !== 'function') {
        const type = String.toString.call(handle);
        const msg =
          'Route.' +
          method +
          '() requires a callback function but got a ' +
          type;
        throw new Error(msg);
      }

      const layer = new Layer('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

export default Route;