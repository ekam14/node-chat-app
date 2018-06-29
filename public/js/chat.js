var socket = io();  //this file will only run we are on chat.html in browser client side//
socket.on('connect',function(){    //only custom events need .emit calling//
  //console.log('Connected to server');
  var params = jQuery.deparam(window.location.search); //for getting values from url//
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href='/';  //go back to home page//
    }else{
      console.log('No error');
    }
  });
});

socket.on('updateUserList',function(users){
  console.log(users);
  var ol = jQuery('<ol></ol>');
  users.forEach((user) => {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('disconnect',function(){
  console.log('disconnected to server');
});

socket.on('newMessage',function(message){  //server to the client //
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();  //get the html of the script//
  var html = Mustache.render(template,{ //send the output object//
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  // var li = jQuery('<li class="list-group-item"></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault(); // prevent the form from submitting //
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage',{
    text:messageTextBox.val()
  },function(){   // callback
    messageTextBox.val('');  // will make the text box empty after sending it //
  });
});

var locationButton = jQuery('#send-location');


//geolocation button //
locationButton.on('click',function(){
  locationButton.attr('disabled','disabled').text('Sending Location....'); // disabling the button //
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function(position){   // success function
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){  // error function //
    alert('Unable to fetch your location.');
    locationButton.removeAttr('disabled').text('Send Location');
  });
});

socket.on('locationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  // var li = jQuery('<li class="list-group-item"></li>');
  // var a = jQuery('<a target="_blank">My current Location</a>');
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
