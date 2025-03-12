const express = require('express');
const path = require('path'); // Add this line
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});c
// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast to all clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});