import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Styled from 'styled-components';
import { Provider } from 'mobx-react';

// Get Pages
import OauthHandler from '../src/pages/oauth-handler';
import Home from '../src/pages/home';

import { MessageStore, UserStore } from '../src/stores';

const MainApp = Styled.div`
    min-height: 100vh;
    background-color: #11151C;
    width: 100%;
    color: #FFFFFF;
    font-family: monospace;
`;

class App extends Component {
	state = {};

	render() {
		return (
			<MainApp>
				<Provider messageStore={MessageStore} userStore={UserStore}>
					<Router>
						<Fragment>
							<Route exact path="/" component={Home} />
							<Route path="/oauth/handler" component={OauthHandler} />
						</Fragment>
					</Router>
				</Provider>
			</MainApp>
		);
	}
}

export default App;
