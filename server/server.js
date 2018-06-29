const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname,'../public');  // using path for addressing is much easier and nicer thing to do //
var app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
var io = socketIO(server); // socketIO needs the server we made//

app.use(express.static(publicPath));   // app.use(express.static(root))  root(absolute path) here must be from __dirname

io.on('connection',(socket) => { // io  is server and socket is for individual connection
  console.log('User connected');

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and Room Name required');
    }
    callback();
  });
  // Greetings  from server when user connects //
  socket.emit('newMessage',generateMessage('Admin','Welcome!!'));   // newMessage i.e from server to the individual user //

  //New User Joins
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User has joined'));

  socket.on('createMessage',(message,callback) => {  // from client to the server //
    console.log('New message created',message);  //sending the received message to all the users //
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback(); // acknowledgement//
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('locationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
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
