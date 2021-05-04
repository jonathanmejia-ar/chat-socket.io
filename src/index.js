const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    let msg = 'User connected';
    console.log(msg);
    io.emit('user-connected', msg);

    socket.on('disconnect', () => {
        let msg = 'User disconnect'
        console.log(msg);
        io.emit('user-disconnected', msg);
    });
});

io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg);
    });
});

io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on port: 3000');
});