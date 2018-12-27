const { authenticate } = require('@feathersjs/authentication').hooks;

const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

// Get necessary Hooks
const customizeGoogleProfile = require('../../hooks/customize-google-profile');
const populateUserlistOnPatch = require('../../hooks/populate-userlist-on-patch');
module.exports = {
	before: {
		all: [],
		find: [ authenticate('jwt') ],
		get: [ authenticate('jwt') ],
		create: [ hashPassword(), customizeGoogleProfile() ],
		update: [ hashPassword(), authenticate('jwt') ],
		patch: [ hashPassword(), authenticate('jwt') ],
		remove: [ authenticate('jwt') ]
	},

	after: {
		all: [
			// Make sure the password field is never sent to the client
			// Always must be the last hook
			protect('password')
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [ populateUserlistOnPatch() ],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
