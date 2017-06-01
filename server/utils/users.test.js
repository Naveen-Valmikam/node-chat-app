const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{

var users;


beforeEach(()=>{
  users = new Users();
  users.users = [{
    id:'123',
    name:'Naveen',
    room:'Node User Group'
  },{
    id:'456',
    name:'Don',
    room:'Node User Group'
  },{
    id:'789',
    name:'Ashley P',
    room:'React Course'
  }];
});


it('should add a new user',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'Naveen V',
      room:'Node user group'
    };

    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

it('should remove a user',()=>{
    var userId = '123';
    var userRemoved = users.removeUser(userId);
    expect(userRemoved.id).toBe(userId);
});

it('should not remove a user',()=>{
  var userId = '987';
  var userRemoved = users.removeUser(userId);
  expect(userRemoved).toNotExist(userId);
});

it('should find a user',()=>{
  var userId = '123';
  var user = users.getUser(userId);
  expect(user.id).toBe(userId);
});

it('should find not find a user',()=>{
  var userId = '987';
  var user = users.getUser(userId);
  expect(user).toNotExist();
});

it('should return names for Node User Group',()=>{
  var userList = users.getUserList('Node User Group');
  expect(userList).toEqual(['Naveen','Don']);
});

});
