// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const logger = require('../logger');
module.exports = function(options = {}) {
	return async (context) => {
		try {
			const { app, method, result, params } = context;

			// Ensure we always have a list of messages after each method call...
			const messages = method === 'find' ? result.data : [ result ];
			// N.B: The find method produces more than one result value as opposed
			// to the other values that could produce singular results

			//  Messages now contain an array of the data produced by the operations on the message service...

			//  Now, we get the user value from each of the messages...
			const resultMessages = await Promise.all(
				messages.map(async (message) => {
					// Now get the user associated with the message by the userId
					if (message.userId) {
						const user = await app.service('users').get(message.userId, params);
						return (message.user = user);
					}
				})
			);

			context.result.data.messages = resultMessages;
			return context;
		} catch (err) {
			logger.error('An error occured while fetching the user: ', err);
		}
	};
};
