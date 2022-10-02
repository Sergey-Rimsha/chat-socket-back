"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
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
];
app.get('/', (req, res) => {
    res.send('Hello world get endpoint');
    console.log('user connected / app');
});
const usersState = new Map();
io.on("connection", (socket) => {
    usersState.set(socket, { id: new Date().getDate().toString(), name: 'anonym' });
    socket.on('client-name-set', (name) => {
        if (typeof name !== 'string') {
            return;
        }
        const user = usersState.get(socket);
        user.name = name;
        console.log(`client-name-set -> ${name}`);
    });
    socket.on('client-message-sent', (message) => {
        if (typeof message !== 'string') {
            return;
        }
        const user = usersState.get(socket);
        const id = Math.random();
        const newMessage = { message, id: new Date().getTime().toString(), user: { id: user.id, name: user.name } };
        state.push(newMessage);
        socket.emit('new-message-sent', newMessage);
        console.log(`client-message-sent -> ${message}`);
    });
    socket.emit('init-messages-published', state);
    console.log('user connected socket io');
});
httpServer.listen(PORT);
