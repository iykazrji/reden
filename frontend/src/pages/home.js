import React from 'react';
import Styled from 'styled-components';
import { Flex, Box } from 'rebass';

const MainApp = Styled.div`
    min-height: 100vh;
    height: 100vh;
    background-color: #141E30;
    width: 100%;
    color: #FFFFFF;
    font-family: 'Rubik', sans-serif;
`;
const SignupButton = Styled.button`
    display: block;
    width: 150px;
    border-radius: 5px;
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
const WelcomeText = Styled.h3`
    text-align: center;
    font-size: 36px;
`;

const openAuthWindow = () => {
	let strWindowFeatures = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
	let windowObjectReference = window.open(
		'http://localhost:3030/auth/google/',
		'Sign in to Google',
		strWindowFeatures
	);
};

export default class Home extends React.Component {
	render() {
		return (
			<MainApp>
				<Flex
					justifyContent="center"
					alignItems="center"
					css={{
						border: `1px solid`,
						height: `100%`
					}}>
					<Box>
						<WelcomeText>Welcome to Reden</WelcomeText>
						<SignupButton
							onClick={() => {
								openAuthWindow();
							}}>
							Sign in With Google
						</SignupButton>
					</Box>
				</Flex>
			</MainApp>
		);
	}
}
