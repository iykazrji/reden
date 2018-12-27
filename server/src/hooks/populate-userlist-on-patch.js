// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async (context) => {
		console.log('userlist has been patched somehow...');
		const { app } = context;

		// Fetch the userlist at the moment
		const userList = await app.service('users').find();
		context.service.emit('populate-userlist', userList.data);

		return context;
	};
};
