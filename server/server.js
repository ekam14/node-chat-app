const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');  // using path for addressing is much easier and nicer thing to do //
var app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));   // app.use(express.static(root))  root(absolute path) here must be from __dirname

io.on('connection',(socket) => {
  console.log('User connected');
  socket.on('disconnect',() =>{
    console.log('User disconnected');
  });
});

app.get('/',(req,res) => {
  res.render('index.html');
});

server.listen(port,() => {
  console.log(`App started on Port ${port}`);
});
