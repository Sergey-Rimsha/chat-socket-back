import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true
	}
});

const PORT = process.env.PORT || 7001;

const state = [
	{ message: 'hello', id: '4545', user: { id: '45r4as5', name: 'Sergey' } },
	{ message: 'hello', id: '454ds5', user: { id: '45e4as5', name: 'Sasha' } },
	{ message: 'hello', id: '4asd545', user: { id: '45s4as5', name: 'Sveta' } },
]

app.get('/', (req, res) => {
	res.send('Hello world get endpoint')
	console.log('user connected / app');
})

const usersState = new Map();

io.on("connection", (socket) => {

	usersState.set(socket, { id: new Date().getDate().toString(), name: 'anonym' })

	socket.on('client-name-set', (name: string) => {
		if (typeof name !== 'string') {
			return
		}
		const user = usersState.get(socket)
		user.name = name;
	})

	socket.on('client-message-sent', (message: string) => {
		if (typeof message !== 'string') {
			return

		}
		const user = usersState.get(socket)

		const id = Math.random()
		const newMessage = { message, id: new Date().getTime().toString(), user: { id: user.id, name: user.name } };
		state.push(newMessage)

		socket.emit('new-message-sent', newMessage);
	})

	socket.emit('init-messages-published', state)

	console.log('user connected socket io');
});

httpServer.listen(PORT);