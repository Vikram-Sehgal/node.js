const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorhandler = require('errorhandler');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

const routes = require('./routes');

app.get('/posts', routes.posts.get);
app.post('/posts', routes.posts.post);
app.put('/posts/:postId', routes.posts.put);
app.delete('/posts/:postId', routes.posts.del);

app.get('/posts/:postId/comments', routes.comments.get);
app.post('/posts/:postId/comments', routes.comments.post);
app.put('/posts/:postId/comments/:commentId', routes.comments.put);
app.delete('/posts/:postId/comments/:commentId', routes.comments.del);

app.listen(3000);
console.log('Your server is running at http://localhost:3000/posts');
