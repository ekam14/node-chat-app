const Users = require('./users.js');

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

var isPresent = (name,users) => {
  var nameArray = users.getFullUserList();
  var res = nameArray.filter((userName) => userName === name);
  return (res.length !== 0);
};

module.exports = {isRealString,isPresent};
