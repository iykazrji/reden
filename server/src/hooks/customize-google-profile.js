// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async (context) => {
		const { data } = context;
		if (data.google) {
			// Google authentication
			const email = (data.email = data.google.profile.emails.find((email) => email.type === 'account').value);
			const displayName = data.google.profile.displayName;
			console.log('google email: ', email);
			console.log('display name: ', displayName);

			// Add new email to context's Data
			context.data.email = email;
			context.data.displayName = displayName;
		}
		return context;
	};
};
