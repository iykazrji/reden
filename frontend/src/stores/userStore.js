import { observable, action, decorate, computed } from 'mobx';
import FeathersClient from '../api/feathers';

class UserStore {
	userList = [];
	currentUserId = null;
	currentUser = {};

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
			if (localStorage.getItem('feathers-jwt')) {
				console.log('Not Authenticated but user token is set in local storeage');
				// Remove feathers-jwt from local storage
				localStorage.removeItem('feathers-jwt');
				if (localStorage.getItem('feathers-userId')) {
					// Remove the UserId from the localstorage...
					localStorage.removeItem('feathers-userId');
				}
			}
		});

		const users = FeathersClient.service('users');

		FeathersClient.on('authenticated', (login) => {
			console.log('User has been authenticated...');

			console.log(login);
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
