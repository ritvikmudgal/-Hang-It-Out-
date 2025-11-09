const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile('HangOutt/index.html');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for messages from clients
    socket.on('message', (msg) => {
        console.log('Message received:', msg);

    // Broadcast the message to all connected clients except the sender
        socket.broadcast.emit('message', msg);
    });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});