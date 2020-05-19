const express = require('express');
// need body parser whenever we user sends us json and we want the data to look perfectly in api handler req.body
const bodyParser = require('body-parser');
// randomBytes to generate random ID for posts
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

// in memory storage
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  // random hex id
  const id = randomBytes(4).toString('hex');
  // body: { title: ... }
  const { title } = req.body;

  posts[id] = { id, title };

  // let the client know the post was just created
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
