import React, { Fragment } from 'react';
import Styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Flex, Box } from 'rebass';

const ChatPageMainWrapperFlex = Styled(Flex)`
    width: 100%;
    height: 100vh;
`;
const ChatPageLeftColumnBox = Styled(Box)`
    border-right: 1px solid rgba(170, 63, 60, 0.5);
    
`;

const ChatPage = (props) => {
	return (
		<Fragment className="chat-page">
			<ChatPageMainWrapperFlex className="chat-page-main-wrapper">
				<ChatPageLeftColumnBox width={[ 0.3 ]}>Stuff</ChatPageLeftColumnBox>
				<Box width={[ 0.7 ]}>Stuff</Box>
			</ChatPageMainWrapperFlex>
		</Fragment>
	);
};

export default ChatPage;
