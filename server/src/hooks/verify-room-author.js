// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

const mongoose = require('mongoose');

module.exports = function(options = {}) {
	return async (context) => {
		console.log(context.data);
		const { data } = context;
		if (data.createdBy) {
			console.log(data.createdBy);
			if (!mongoose.Types.ObjectId.isValid(data.createdBy)) {
				throw new Error('User ID is invalid');
			}
		}
		return context;
	};
};
