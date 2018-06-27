var socket = io();
socket.on('connect',function(){
  console.log('connected to server');
});
socket.on('disconnect',function(){
  console.log('disconnected to server');
});

socket.on('newMessage',function(message){  //server to the client //
  console.log('New Message',message);
});

// socket.emit('createMessage',{ // i.e user to the server//
//   from:"John Doe",
//   text:"Hello Everyone!!"
// });
