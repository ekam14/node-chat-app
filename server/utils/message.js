const moment = require('moment');

const generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt:moment().valueOf()   //same as new Date().getTime()
  }
};

const generateLocationMessage = (from,lat,long) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${lat},${long}`,
    createdAt:moment().valueOf()
  }
};

module.exports = {generateMessage,generateLocationMessage};
