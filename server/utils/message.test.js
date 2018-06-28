const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');

describe('generate message',() =>{
  it('should generate correct message object',() => {
    var from ='ekam';var text = 'HELLO';
    var message = generateMessage(from,text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage',() => {
  it('should generate correct location object',() => {
    var text ='ekam';
    var lat=23;var long=23;
    var url = `https://www.google.com/maps?q=${lat},${long}`;
    var message = generateLocationMessage(text,lat,long);
    expect(message.from).toBe(text);
    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(url);
  });
});
