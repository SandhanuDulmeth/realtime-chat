const socket = io();
let userId;

socket.on('connect', () => {
  userId = socket.id;
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const messageData = {
      text: input.value,
      sender: userId
    };
    socket.emit('chat message', messageData);
    input.value = '';
  }
});

socket.on('chat message', (msgData) => {
  const li = document.createElement('li');
  li.className = `message ${msgData.sender === userId ? 'sent' : 'received'}`;
  li.textContent = msgData.text;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});