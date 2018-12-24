import React from 'react';
import { Redirect } from 'react-router-dom';

import qs from 'query-string';
import Styled from 'styled-components';

const Heading = Styled.h3`
    color: #FFFFFF;
    border: 1px solid;
`;
export default class OauthHandler extends React.Component {
	state = {
		isAuthenticated: false
	};
	componentDidMount() {
		const opener = window.opener;
		console.log('component did mount running');
		const parsed = qs.parse(this.props.location.search);
		console.log(parsed);

		const token = parsed.token || null;
		const userId = parsed.userId || null;

		if (token) {
			window.localStorage.setItem('feathers-jwt', token);
		} else {
			console.log('Token is not part of the request');
		}

		if (userId) {
			window.localStorage.setItem('feathers-userId', userId);
		} else {
			console.log('User info not part of the request');
		}

		if (token || userId) {
			this.setState({
				isAuthenticated: true
			});
			window.close();
			opener.location.reload();
		}
	}

	render() {
		return !this.state.isAuthenticated ? <Heading>Here's the Oauth Handler...</Heading> : <Redirect to="/" />;
	}
}
