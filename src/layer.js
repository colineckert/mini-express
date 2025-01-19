function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
}

Layer.prototype.handleRequest = function handle(req, res, next) {
  const fn = this.handle;

  try {
    fn(req, res, next);
  } catch (err) {
    console.error(err);
  }
};

exports = module.exports = Layer;
