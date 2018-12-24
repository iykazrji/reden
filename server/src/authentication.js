const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

// Get Oauth Handler Middleware
// This is very Key as we want a custom redirect for the token...
const handlerMiddleWare = require('./middleware/oauth-handler');

module.exports = function(app) {
	const config = app.get('authentication');

	// Set up authentication with the secret
	app.configure(authentication(config));
	app.configure(jwt());
	app.configure(local());

	// App object to handler
	const makeHandler = handlerMiddleWare(app);

	app.configure(
		oauth2(
			Object.assign(
				{
					name: 'google',
					Strategy: GoogleStrategy,
					handler: makeHandler(config.google.successRedirect)
					// !Important. The handler would ensure that the token is sent to the client
					// To be intersected and saved in the localstorage?
				},
				config.google
			)
		)
	);

	app.configure(
		oauth2(
			Object.assign(
				{
					name: 'facebook',
					Strategy: FacebookStrategy
				},
				config.facebook
			)
		)
	);

	// The `authentication` service is used to create a JWT.
	// The before `create` hook registers strategies that can be used
	// to create a new valid JWT (e.g. local or oauth2)
	app.service('authentication').hooks({
		before: {
			create: [ authentication.hooks.authenticate(config.strategies) ],
			remove: [ authentication.hooks.authenticate('jwt') ]
		},
		after: {
			create: [
				async (context) => {
					// Get the user ID:
					const user_id = context.params.user._id;
					const user = await app.service('users').get(user_id);
					console.log('user is', user);
					// ... You can pretty much use this user object to run more checks e.g
					// 1. Manipulate a 'Profiles' Service if not created
					context.result = { user_id, ...context.result };
				}
			]
		}
	});
};
