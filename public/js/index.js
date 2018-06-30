$('#room-name').focus(function(){
  $.get("/rooms",function(rooms){
    var list = '';
    rooms.forEach((room) => {
      list += `<option value="${room}">`;
    });
    $('#roomList').html(list);
  });
});
