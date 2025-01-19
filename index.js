let express = require("./src/express");
const app = express();

app.get("/", (req, res, next) => {
  console.log(next);
  next();
});

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.post("/post", (req, res) => {
  res.writeHead(200);
  res.write("Data from post :)");
  res.end();
});

app.listen(3000, () => console.log("mini-express listening on port 3000!"));
