// todo write tests for  validations
const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
it('should reject non-string values',()=>{
    expect(isRealString(1234)).toBe(false);
});

it('should reject string with only spaces',()=>{
  expect(isRealString('     ')).toBe(false);
});

it('should allow string with non-space characters',()=>{
  expect(isRealString('This is sample test  ')).toBe(true);
});
});
