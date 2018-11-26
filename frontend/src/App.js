import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Styled from 'styled-components';
// Get Pages
import OauthHandler from '../src/pages/oauth-handler';
import Home from '../src/pages/home';

const MainApp = Styled.div`
    min-height: 100vh;
    background-color: #141E30;
    width: 100%;
    color: #FFFFFF;
    font-family: monospace;
`;

class App extends Component {
	render() {
		return (
			<MainApp>
				<Router>
					<Fragment>
						<Route exact path="/" component={Home} />
						<Route path="/oauth/callback" component={OauthHandler} />
					</Fragment>
				</Router>
			</MainApp>
		);
	}
}

export default App;
