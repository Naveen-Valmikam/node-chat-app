const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from = 'Lee';
    var text = 'Some sample text';

    var message = generateMessage(from,text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });

});


describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    var from ='John';
    var latitude = 1;
    var longtitude =2;
    var locationMessage = generateLocationMessage(from,latitude,longtitude);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.url).toBe('https://www.google.com/maps?q=1,2');
  });
});
