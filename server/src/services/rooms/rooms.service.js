// Initializes the `rooms` service on path `/rooms`
const createService = require('feathers-mongodb');
const hooks = require('./rooms.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/rooms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rooms');

  mongoClient.then(db => {
    service.Model = db.collection('rooms');
  });

  service.hooks(hooks);
};
