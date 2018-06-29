const expect = require('expect');

const {Users} = require('./users.js');

describe('Users',() => {

  //Seed Data//
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:1,
      name:'Andrew',
      room:'Node Course'
    },{
      id:2,
      name:'Brad',
      room:'Node Course'
    },{
      id:3,
      name:'Ekam',
      room:'React Course'
    }];
  });

  it('should add new user',() => {
    var users= new Users();
    var user = {
      id:'123',
      name:'Ekam',
      room:'New room'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should get a user for valid ID',() => {
    var resUser = users.getUser(1);
    expect(resUser[0]).toInclude({id:1,name:'Andrew',room:'Node Course'});
  });
  it('should not get a user for invalid ID',() => {
    var resUser = users.getUser(4);
    expect(resUser.length).toBe(0);
  });

  it('should remove a user for valid id',() => {
    var resUser = users.removeUser(1);
    expect(resUser).toExclude([{id:1,name:'Andrew',room:'Node Course'}]);
  });
  it('should not remove a user for invalid id',() => {
    var resUser = users.removeUser(4);
    expect(resUser.length).toBe(0);
  });

  it('should return names for node course',() => {
    var resUser = users.getUserList('Node Course');
    expect(resUser).toEqual(['Andrew','Brad']);
  });
  it('should return names for react course',() => {
    var resUser = users.getUserList('React Course');
    expect(resUser).toEqual(['Ekam']);
  });
});
