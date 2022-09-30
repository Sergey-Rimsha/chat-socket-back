import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.get('/', (req, res) => {
	res.send('Hello world get endpoint')
})

io.on("connection", (socket) => {
	// ...
	console.log('user connected');
});

httpServer.listen(7001);