module.exports = (app) => {
	// This middleware handles the OAuth redirect in a more stateless way
	// (I.E Without the use of cookies as is the default method Feathers would rather deal
	//  With authentication.)
	//  It adds the access token as part of a provieded success redirect URL.
	//  The script in the Redirect url intercepts the token value, stores it in the browser's
	//  Localstorage which is then now accessible for further authorization purposes.

	return function(url) {
		const config = app.get('authentication');
		const options = {
			jwt: config.jwt,
			secret: config.secret
		};

		return function(req, res, next) {
			if (req.feathers && req.feathers.payload) {
				const userId = req.feathers.payload.userId;
				app.passport
					.createJWT(req.feathers.payload, options)
					.then((token) => {
						res.redirect(`${url}?token=${token}&userId=${userId}`);
					})
					.catch((error) => {
						next(error);
					});
			}
		};
	};
};
