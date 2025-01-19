const mixin = require("merge-descriptors");
const http = require("http");
const proto = require("./app");

exports = module.exports = createApplication;

function createApplication() {
  const app = (req, res, next) => {
    app.handle(req, res, next);
  };

  mixin(app, proto, false);

  const req = Object.create(http.IncomingMessage.prototype);
  const res = Object.create(http.ServerResponse.prototype);

  res.send = function (body) {
    console.log("wow", body);
  };

  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app },
  });

  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app },
  });

  app.init();
  return app;
}

exports.application = proto;
