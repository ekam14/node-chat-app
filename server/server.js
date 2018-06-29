const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString,isPresent} = require('./utils/validation');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname,'../public');  // using path for addressing is much easier and nicer thing to do //
var app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
var io = socketIO(server); // socketIO needs the server we made//
var users = new Users(); // class instance //

app.use(express.static(publicPath));   // app.use(express.static(root))  root(absolute path) here must be from __dirname

io.on('connection',(socket) => { // io  is server and socket is for individual connection
  console.log('User connected');

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room Name required');
    }
    if(isPresent(params.name,users)){
      return callback('Sorry this name exists . Please try with another name.')
    }
    params.room = params.room.toLowerCase();
    socket.join(params.room);  //makes connection according to the room name//
    users.removeUser(socket.id);  // will remove this socket from any other room //
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    // Greetings  from server when user connects //
    socket.emit('newMessage',generateMessage('Admin','Welcome!!'));   // newMessage i.e from server to the individual user //

    //New User Joins
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();
  });

  socket.on('createMessage',(message,callback) => {  // from client to the server //
    var user = users.getUser(socket.id);
    //sending the received message to all the users //
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback(); // acknowledgement//
  });

  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);
    //sending the received message to all the users //
    if(user){
      io.to(user.room).emit('locationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });

  // socket.on('Typing',(message) => {
  //   var user = users.getUser(socket.id);
  //   if(user && isRealString(message.text)){
  //     io.to(user.room).emit('newMessage',generateMessage(user.name,user.name+message.text));
  //   }
  // });

  socket.on('disconnect',() =>{  //when user disconnects
    console.log('User disconnected');
    var user = users.removeUser(socket.id); //when user disconnects list must be updated //

    if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }

  });
});

app.get('/',(req,res) => {
  res.render('index.html');
});

app.get('/rooms',(req,res) => {
  res.send(users.getRoomList());
  console.log(req.body);
});

server.listen(port,() => {
  console.log(`App started on Port ${port}`);
});

module.exports = {app};
