let express = require('./src/express');
const app = express();

app.get('/', (req, res) => {
  res.writeHead(200);
  res.write('Hello World from /');
  res.end();
});

app.get('/2', (req, res) => {
  res.writeHead(200);
  res.write('Hello World from /2');
  res.end();
});

app.get('/posts', (req, res) => {
  res.writeHead(200);
  res.write('Hello World from /posts');
  res.end();
});

app.listen(3000, () => console.log('mini-express listening on port 3000!'));
