const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const socket = require('./socket')(server);

mongoose.connect(
  'mongodb+srv://tindev:tindev@cluster0-vy25p.mongodb.net/tindevDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = socket.io;
  req.connectedUsers = socket.connectedUsers;
  
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);