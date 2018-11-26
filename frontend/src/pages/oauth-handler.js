import React from 'react';
import { Redirect } from 'react-router-dom';

export default class OauthHandler extends React.Component {
	componentDidMount() {
		const token = getQueryVariable('token');
		const userId = getQueryVariable('userId');

		if (token) {
			window.localStorage.setItem('feathers-jwt', token);
		}
		if (userId) {
			window.localStorage.setItem('feathers-userId', userId);
		}
		if (token || userId) {
			// Redirect to home route...
			return <Redirect path={'/'} />;
		}
	}

	render() {
		return <div>Here's the Oauth Handler...</div>;
	}
}

const getQueryVariable = (variable) => {
	// This script expects and intercepts the provided token and stores it in Localstorage.
	let query = window.location.search.substring(1);
	let vars = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		let pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	console.log('Query variable %s not found', variable);
};
