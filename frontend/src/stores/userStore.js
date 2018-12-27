import { observable, action, decorate, computed } from 'mobx';
import FeathersClient from '../api/feathers';

class UserStore {
	userList = [];
	currentUserId = null;

	setUserList = (userData) => {
		this.userList = userData;
	};

	setCurrentUser = (userId) => {
		this.currentUserId = userId;
	};

	get onlineUsersList() {
		console.log(this.userList);
		if (this.userList) {
			return this.userList.filter((user) => {
				return user.online === true;
			});
		} else {
			return null;
		}
	}

	constructor() {
		FeathersClient.authenticate().catch((err) => {
			console.log('Error in authentication: ', err);
		});

		const users = FeathersClient.service('users');

		FeathersClient.on('authenticated', (login) => {
			console.log('User has been authenticated...');

			// Get all Users...
			users.find().then((users) => {
				this.setUserList(users.data);
			});
		});

		FeathersClient.on('logout', (users) => {
			console.log(users);
			this.setUserList([]);
		});

		//  Would run if an event has occured on the user
		//  Service
		users.on('populate-userlist', (data) => {
			console.log(data);
			this.setUserList(data);
		});
	}
}

export default decorate(UserStore, {
	userList: observable,
	currentUserId: observable,
	onlineUsersList: computed,
	setUserList: action,
	setCurrentUser: action
});
