// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const logger = require('../logger');
module.exports = function(options = {}) {
	return async (context) => {
		try {
			const { app, params } = context;

			// Get the userID from the params object
			const user_id = params.user._id;

			// We path the user object with the online tag...
			const user = await app.service('users').patch(user_id, { online: true }, params);
			logger.log('user object: ', user);

			// Pass on the context...
			return context;
		} catch (err) {
			logger.error('An error occured', err);
			return err;
		}
	};
};
