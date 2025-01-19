let express = require("./src/express");
const app = express();

app.get("/", (req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.writeHead(200);
  res.write("Response from second matching route");
  res.send("hello world");
  res.end();
});

app.listen(3000, () => console.log("mini-express listening on port 3000!"));
