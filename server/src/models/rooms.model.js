// rooms-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function(app) {
	const mongoose = require('mongoose');

	const ObjectId = mongoose.Schema.Types.ObjectId;
	const mongooseClient = app.get('mongooseClient');

	const { Schema } = mongooseClient;
	const rooms = new Schema(
		{
			users: [ { type: ObjectId, ref: 'Users' } ],
			roomname: { type: String, unique: true, sparse: true },
			createdBy: { type: ObjectId, ref: 'Users', default: null }
		},
		{
			timestamps: true
		}
	);

	return mongooseClient.model('rooms', rooms);
};
