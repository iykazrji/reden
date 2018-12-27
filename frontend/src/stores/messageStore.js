import { decorate, observable, action } from 'mobx';
import FeathersClient from '../api/feathers';

class MessageStore {
	messageList = [];

	setMessagesList = (messageData) => {
		this.messageList = messageData;
	};

	constructor() {
		FeathersClient.authenticate().catch((err) => {
			console.log('Error in authentication: ', err);
		});

		const messages = FeathersClient.service('messages');

		FeathersClient.on('authenticated', (login) => {
			console.log('User has been authenticated...');

			// Get all Users...
			messages.find().then((messages) => {
				console.log(messages.data);
				this.setMessagesList(messages.data);
			});
		});
	}
}

export default decorate(MessageStore, {
	messageList: observable,
	setMessagesList: action
});
