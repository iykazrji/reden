const { authenticate } = require('@feathersjs/authentication').hooks;

const updateRoomCreatedAt = require('../../hooks/update-room-created-at');

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [updateRoomCreatedAt()],
		update: [updateRoomCreatedAt()],
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
