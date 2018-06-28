const expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generate message',() =>{
  it('should generate correct message object',() => {
    var from ='ekam';var text = 'HELLO';
    var message = generateMessage(from,text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});
