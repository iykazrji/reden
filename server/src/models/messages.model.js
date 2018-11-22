// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
	const mongooseClient = app.get('mongooseClient');
	const mongoose = require('mongoose');

	const { Schema } = mongooseClient;
	const ObjectID = mongoose.Schema.Types.ObjectId;

	const messages = new Schema(
		{
			name: String,
			text: { type: String, required: true }
		},
		{
			timestamps: true
		}
	);

	return mongooseClient.model('messages', messages);
};
