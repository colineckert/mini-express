let express = require('./src/express');
const app = express();

app.get('/', (req, res) => {
  res.writeHead(200);
  res.write('Hello World');
  res.end();
});

app.listen(3000, () => {
  console.log('mini-express listening on port 3000!');
});
