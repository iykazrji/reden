// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const logger = require('../logger');
const jwt = require('jsonwebtoken');

module.exports = function(options = {}) {
	return async (context) => {
		try {
			const { params, app, id } = context;
			const jwtSecret = app.get('authentication').secret;

			// Context.id contains the JWT sent from the client...
			// Decode the JWT sent from the client and use it to idenfify the
			// User
			const decoded = jwt.verify(id, jwtSecret);
			const user_id = decoded.userId;

			// Patch the user data with the offline tag...
			app.service('users').patch(user_id, { online: false }, params);

			return context;
		} catch (err) {
			logger.error('An error occured at the authentication after hook:', err);
			return err;
		}
	};
};
