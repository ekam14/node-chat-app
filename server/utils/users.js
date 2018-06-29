//Users class//

class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room}; // creating a new object//
    this.users.push(user);
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }
  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUserList(room){  //by names only
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};

// class Sample {
//   constructor(name,age){
//     this.name=name;   // this here means it will assign the name property of the new instance to the argument name provided//
//     this.age=age;
//   }
//   print(){
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var sample = new Sample('Ekam',20);
// console.log(sample.print());
