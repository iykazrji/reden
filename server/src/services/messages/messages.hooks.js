const { authenticate } = require('@feathersjs/authentication').hooks;

const processMessages = require('../../hooks/process-messages');

const gravatar = require('../../hooks/gravatar');

const populateMessages = require('../../hooks/populate-messages');

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
		all: [ populateMessages() ],
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
