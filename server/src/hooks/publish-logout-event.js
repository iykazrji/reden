// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async (context) => {
		const { app, data } = context;
		console.log('Logout Data: ', data);
		const userList = await app.service('users').find();

		app.channel('authenticated').send(userList);
		return context;
	};
};
