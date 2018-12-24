module.exports = function(options = {}) {
	return async (context) => {
		const { params, app } = context;
		// Get the user ID:
		const user_id = params.user._id;
		const user = await app.service('users').get(user_id);
		// ... You can pretty much use this user object to run more checks e.g
		// 1. Manipulate a 'Profiles' Service if not created
		context.result = { user_id, ...context.result };
		return context; // for good measure :)
	};
};
