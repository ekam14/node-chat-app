const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');  // using path for addressing is much easier and nicer thing to do //
var app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
var io = socketIO(server); // socketIO needs the server we made//

app.use(express.static(publicPath));   // app.use(express.static(root))  root(absolute path) here must be from __dirname

io.on('connection',(socket) => { // io  is server and socket is for all connections
  console.log('User connected');

  // Greetings  from server when user connects //
  socket.emit('newMessage',{   // newMessage i.e from server to the individual user //
    from:"Admin",
    text:"WELCOME !!",
    createdAt: new Date().getTime()
  });

  //New User Joins
  socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"New User has joined",
    createdAt: new Date().getTime()
  });

  socket.on('createMessage',(message) => {  // from client to the server //
    console.log('New message created',message);
    io.emit('newMessage',{    //sending the received message to all the users //
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

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
