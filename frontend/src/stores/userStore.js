import { observable, action, decorate } from 'mobx';
import FeathersClient from '../api/feathers';

class UserStore {
	userList = [];
	currentUserId = null;

	setUserList = (userData) => {
		this.userList = userData;
	};

	constructor() {
		FeathersClient.authenticate().catch((err) => {
			console.log('Error in authentication: ', err);
		});

		const users = FeathersClient.service('users');

		FeathersClient.on('authenticated', (login) => {
			console.log('User has been authenticated...');
			console.log(login);

			// Get all Users...
			users.find().then((users) => {
				console.log(users.data);
				this.setUserList(users.data);
			});
		});
	}
}

export default decorate(UserStore, {
	userList: observable,
	currentUserId: observable,
	setUserList: action
});
