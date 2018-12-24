// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const logger = require('../logger');

module.exports = function(options = {}) {
	return async (context) => {
		try {
			const { params, app, id } = context;

			console.log('Params object:', id);

			// get the user_id
			const user_id = params.user._id;

			const user = await app.service('users').patch(user_id, { online: false }, params);
			logger.log('User object', user);
			return context;
		} catch (err) {
			logger.error('An error occured at the authentication after hook:', err);
			return err;
		}
	};
};
