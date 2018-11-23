const { authenticate } = require('@feathersjs/authentication').hooks;

const processMessages = require('../../hooks/process-messages');

const gravatar = require('../../hooks/gravatar');

const populateUser = require('../../hooks/populate-user');

module.exports = {
	before: {
		all: [ authenticate('jwt') ],
		find: [],
		get: [],
		create: [ processMessages(), gravatar() ],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [ populateUser() ],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
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
