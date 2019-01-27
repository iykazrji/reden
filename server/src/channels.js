module.exports = function(app) {
	const _ = require('lodash');

	// Helper function to make user join channels
	const joinChannels = (user, connection) => {
		let id = user._id;

		// Add User to the Authenticated Channel
		app.channel('authenticated').join(connection);

		// Get all rooms the user is a part of and add that user to the channel...
		app.service('rooms').find().then((res) => {
			// Res contains all Rooms
			console.log(res);
			let rooms = res.data.filter((room) => {
				return _.includes(room.members.toString(), id.toString());
			});

			if (rooms) {
				// Now add the User to all the channels he's a part of...
				rooms.map((room) => {
					app.channel(`rooms/${room._id.toString()}`).join(connection);
				});
			}
		});

		// Create Personalized Channel for the user...
		app.channel(`userIds/${user._id.toString()}`).join(connection);

		// Now we have added the user to the Authenticated, Users and Rooms channels...
	};

	// Get a user to leave all channels
	const leaveChannels = (user) => {
		app.channel(app.channels).leave((connection) => connection.user._id === user._id);
	};

	// Leave and re-join all channels with new user information
	const updateChannels = (user) => {
		// Find all connections for this user
		const { connections } = app.channel(app.channels).filter((connection) => connection.user._id === user._id);
		// Leave all channels
		leaveChannels(user);

		// Re-join all channels with the updated user information
		connections.forEach((connection) => joinChannels(user, connection));
	};

	if (typeof app.channel !== 'function') {
		// If no real-time functionality has been configured just return
		return;
	}

	app.on('connection', (connection) => {
		// On a new real-time connection, add it to the anonymous channel
		app.channel('anonymous').join(connection);
	});

	app.on('login', (authResult, { connection }) => {
		// connection can be undefined if there is no
		// real-time connection, e.g. when logging in via REST
		if (connection) {
			// Obtain the logged in user from the connection
			const user = connection.user;
			joinChannels(user, connection);

			// The connection is no longer anonymous, remove it
			app.channel('anonymous').leave(connection);
		}

		// Update the User's channels subscription when the user is Patched / Updated / Removed...
		app.service('users').on('updated', updateChannels);
		app.service('users').on('patched', updateChannels);
		app.service('users').on('removed', leaveChannels);

		// Update the User's channels subscription when an activity on the rooms has occured...
		app.service('rooms').on('updated', updateChannels);
		app.service('rooms').on('patched', updateChannels);
		app.service('rooms').on('created', updateChannels);
	});

	// eslint-disable-next-line no-unused-vars
	app.publish((data, hook) => {
		console.log(
			'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'
		);
		console.log('Channels:', app.channels);
		// e.g. to publish all service events to all authenticated users use
		return app.channel('authenticated');
	});

	// On a Message event, publish the event to the following Channels...
	app.service('messages').publish((data, context) => {
		return [
			app.channel('userIds/${data.userId}'),
			data.recepientId ? app.channel('userIds/${data.recepientId}') : null,
			data.roomId ? app.channel('rooms/${data.roomId}') : null
		];
	});
};
