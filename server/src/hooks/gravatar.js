// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

const crypto = require('crypto');

// The gravatar image service...
const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';

module.exports = function(options = {}) {
	return async (context) => {
		const { email } = context.data;

		//  Create Hash for Gravatar to use to create the images...
		const hash = crypto.createHash('md5').update(email).digest('hex');

		// Add avatar information to Data being sent for processing...
		context.data.avatar = `${gravatarUrl}/${hash}?${query}`;

		return context;
	};
};
