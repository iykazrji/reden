import React from 'react';
import Styled from 'styled-components';
import { Flex, Box } from 'rebass';
import { Link } from 'react-router-dom';
import FeathersClient from '../api/feathers';
import { inject, observer } from 'mobx-react';

const MainApp = Styled.div`
    min-height: 100vh;
    height: 100vh;
    width: 100%;
    color: #FFFFFF;
    font-family: 'Montserrat', sans-serif;
`;
const SignupButton = Styled.button`
    display: block;
    width: 150px;
    background-color: #DB4437;
    color: #FFFFFF;
    font-family: monospace;
    text-align: center;
    padding: 15px 10px;
    font-weight: 500;
    margin: 0 auto;
    cursor: pointer;
    border: none;
    box-shadow: 0px 0px 0px rgba(10, 10, 10, 0.08);
`;
const LaunchButton = Styled.button`
	display: block;
    width: 150px;
    background-color: rgba(0,0,0,0);
    color: #FFFFFF;
    font-family: monospace;
    text-align: center;
    padding: 15px 10px;
    font-weight: 500;
    margin: 0 auto;
    cursor: pointer;
	border: 1px solid #AA3F3C;
    box-shadow: 0px 0px 0px rgba(10, 10, 10, 0.08);
`;
const WelcomeText = Styled.h3`
    text-align: center;
	font-size: 66px;
	font-weight: 200;
`;

const openAuthWindow = () => {
	let strWindowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
	let windowObjectReference = window.open(
		'http://localhost:3030/auth/google/',
		'Sign in to Google',
		strWindowFeatures
	);
};

class Home extends React.Component {
	state = {
		isLoggedIn: false
	};
	componentDidMount() {
		const token = window.localStorage.getItem('feathers-jwt');

		this.setState((prevState, props) => {
			return {
				isLoggedIn: token ? true : false
			};
		});

		console.log(this.props.userStore.userList);
	}

	renderUserList = (userList) => {
		console.log(typeof userList);
		if (userList) {
			return userList.map((user) => {
				return <li>{user._id}</li>;
			});
		} else {
			return null;
		}
	};

	render() {
		const { isLoggedIn } = this.state;
		return (
			<MainApp>
				<Flex
					justifyContent="center"
					alignItems="center"
					css={{
						height: `100%`
					}}>
					<Box>
						<WelcomeText>{`${isLoggedIn ? `Welcome Back!` : `Welcome to Reden`}`}</WelcomeText>
						{isLoggedIn ? (
							<LaunchButton
								onClick={() => {
									FeathersClient.logout({ user_id: window.localStorage.getItem('feathers-userid') });
								}}>
								Launch Reden
							</LaunchButton>
						) : (
							<SignupButton
								onClick={() => {
									openAuthWindow();
								}}>
								Sign in With Google
							</SignupButton>
						)}
					</Box>
					<Box>
						<ul>{this.renderUserList(this.props.userStore.onlineUsersList)}</ul>
					</Box>
				</Flex>
			</MainApp>
		);
	}
}

export default inject('userStore', 'messageStore')(observer(Home));
