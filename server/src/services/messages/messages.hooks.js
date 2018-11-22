const { authenticate } = require('@feathersjs/authentication').hooks;

const processMessages = require('../../hooks/process-messages');

const gravatar = require('../../hooks/gravatar');

module.exports = {
	before: {
		all: [ authenticate('jwt') ],
		find: [],
		get: [],
		create: [processMessages(), gravatar()],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [],
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
