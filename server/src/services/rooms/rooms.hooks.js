const { authenticate } = require('@feathersjs/authentication').hooks;

const verifyRoomAuthor = require('../../hooks/verify-room-author');

const addMemberToRoom = require('../../hooks/add-member-to-room');

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [ verifyRoomAuthor(), addMemberToRoom() ],
		update: [ verifyRoomAuthor(), addMemberToRoom() ],
		patch: [ addMemberToRoom() ],
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
