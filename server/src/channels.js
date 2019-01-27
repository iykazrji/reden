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

			// Add it to the authenticated user channel
			app.channel('authenticated').join(connection);

			// Channels can be named anything and joined on any condition

			// E.g. to send real-time events only to admins use
			// if(user.isAdmin) { app.channel('admins').join(connection); }

			// If the user has joined e.g. chat rooms
			// if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

			// Easily organize users by email and userid for things like messaging
			// app.channel(`emails/${user.email}`).join(channel);
			// app.channel(`userIds/$(user.id}`).join(channel);
			// ----------------------------------------------------------------------------------------------- //
			// When a user logs in, Subscribe them to what ever room the have joined
			const id = user._id;

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
		}
	});

	app.service('users').on('updated', updateChannels);
	app.service('users').on('patched', updateChannels);
	app.service('users').on('removed', leaveChannels);

	// eslint-disable-next-line no-unused-vars
	app.publish((data, hook) => {
		// Here you can add event publishers to channels set up in `channels.js`
		// To publish only for a specific event use `app.publish(eventname, () => {})`

		console.log(
			'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'
		); // eslint-disable-line
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

	app.service('rooms').publish('created', (data, context) => {
		return [ app.channel(`room/${context.result._id}`) ];
	});

	// Here you can also add service specific event publishers
	// e.g. the publish the `users` service `created` event to the `admins` channel
	// app.service('users').publish('created', () => app.channel('admins'));

	// With the userid and email organization from above you can easily select involved users
	// app.service('messages').publish(() => {
	//   return [
	//     app.channel(`userIds/${data.createdBy}`),
	//     app.channel(`emails/${data.recipientEmail}`)
	//   ];
	// });
	// app.services('messages').publish((data, context) => []);
};
