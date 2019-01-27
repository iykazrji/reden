// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	const mongoose = require('mongoose');

	return async (context) => {
		const { data } = context;
		if (data.member) {
			if (!mongoose.Types.ObjectId.isValid(data.member)) {
				throw new Error('Member ID is invalid');
			} else {
				data.members = data.member;
			}
		}
		return context;
	};
};
