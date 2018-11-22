// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async (context) => {
		const { data } = context;

		if (!data.text) {
			throw new Error('A message must have a text... Comon!');
		}

		const user = context.params.user;

		// Ensure message is not more than 400 characters...
		const message = data.text.substring(0, 400);

		context.data = {
			text,
			userId: user._id,
			createdAt: new Date().getTime()
		};

		// Hooks should always return the modified context
		return context;
	};
};
