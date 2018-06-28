const moment = require('moment');

//Jan 1st 1970 00:00:00am --> date()

var tc = new Date().getTime();
console.log(moment().valueOf()); // to get current timestamp //

var date = moment(1234);
console.log(date.format('MMMM Do YYYY h:mm:ss a'));
