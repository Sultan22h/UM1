const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve the HTML file when the root route is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'WebPage.html'));
});

// Serve static files (JavaScript, CSS, etc.)
app.use(express.static(__dirname));

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);  // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
http.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
