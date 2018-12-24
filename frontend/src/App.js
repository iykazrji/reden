import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Styled from 'styled-components';

// Get Pages
import OauthHandler from '../src/pages/oauth-handler';
import Home from '../src/pages/home';
import FeathersClient from './api/feathers';

const MainApp = Styled.div`
    min-height: 100vh;
    background-color: #11151C;
    width: 100%;
    color: #FFFFFF;
    font-family: monospace;
`;

class App extends Component {
	state = {};

	componentDidMount() {
		// Try and Authenticate the user

		FeathersClient.authenticate().catch(() => {
			return this.setState({ login: null });
		});

		const users = FeathersClient.service('users');
		FeathersClient.on('authenticated', (login) => {
			console.log('User has been authenticated...');
			console.log(login);

			users.find().then((users) => {
				console.log(users.data);
			});
		});

		FeathersClient.on('logout', () => {
			console.log('user has logged out');
		});
	}

	render() {
		return (
			<MainApp>
				<Router>
					<Fragment>
						<Route exact path="/" component={Home} />
						<Route path="/oauth/handler" component={OauthHandler} />
					</Fragment>
				</Router>
			</MainApp>
		);
	}
}

export default App;
