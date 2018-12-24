// This file sets up the Feathers Client object to be used...

// Import  Feathers
import feathers from '@feathersjs/client';

// Import SocketIO Client
import io from 'socket.io-client';

// The socket...
const socket = io('http://localhost:3030');

// The feathers App
const app = feathers();

// configure the app to use Socket.io...
app.configure(feathers.socketio(socket));

// Store our login token in localstorage
app.configure(
	feathers.authentication({
		storage: window.localStorage
	})
);

export default app;
