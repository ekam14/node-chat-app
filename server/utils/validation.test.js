const expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString',() =>{
  it('should reject any non-string value',() =>{
    var str = 21212;
    expect(isRealString(str)).toBeA('boolean');
    expect(isRealString(str)).toBe(false);
  });
  it('should reject string with only spaces',() =>{
    var str = '  ';
    expect(isRealString(str)).toBeA('boolean');
    expect(isRealString(str)).toBe(false);
  });
  it('should allow the valid string',() =>{
    var str = 'hello';
    expect(isRealString(str)).toBeA('boolean');
    expect(isRealString(str)).toBe(true);
  });
});
