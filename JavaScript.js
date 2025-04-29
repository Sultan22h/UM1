const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('msg');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('chat message', input.value);  // Send message to server
        input.value = '';  // Clear input field
    }
});

// Display incoming messages
socket.on('chat message', function (msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;  // Auto-scroll to the latest message
});
