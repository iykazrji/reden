import React, { Fragment } from 'react';

// This component serves as a Render Prop to pervent

const AuthPage = (props) => {
	console.log(localStorage.getItem('feathers-jwt'));
	return (
		<Fragment>
			{localStorage.getItem('feathers-jwt') ? (
				<Fragment>{props.page}</Fragment>
			) : (
				<div>
					<h3>Unauhorized</h3>
				</div>
			)}
		</Fragment>
	);
};

export default AuthPage;
