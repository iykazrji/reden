// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
	// Add your custom middleware here. Remember that
	// in Express, the order matters.
	app.get('/test', (req, res) => {
		res.json({
			message: 'This is just testing the middleware'
		});
	});
};
