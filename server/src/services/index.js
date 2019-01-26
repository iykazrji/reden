const messages = require('./messages/messages.service.js');
const users = require('./users/users.service.js');
const rooms = require('./rooms/rooms.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(messages);
  app.configure(users);
  app.configure(rooms);
};
