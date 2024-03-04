const socket = io();
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const sendButton = messageForm.querySelector('button');
const chatHistory = document.getElementById('chat-history');

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('chat message', (messages) => {
  // Simulate creating a new list item for the message
  chatHistory.innerHTML = '';

  messages.forEach((msg) => {
    const newMessage = document.createElement('li');
    newMessage.classList.add('list-group-item');
    newMessage.classList.add('message');
    newMessage.innerHTML = `<span class="username">${msg.name}</span> ${msg.message}`;
    // Append the new message to the chat history list
    chatHistory.appendChild(newMessage);
  });
});

// Enable send button when message is entered
messageInput.addEventListener('keyup', () => {
  sendButton.disabled = messageInput.value === '';
});

// Simulate adding message to chat history on form submission
messageForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const message = messageInput.value.trim();
  const username = usernameInput.value.trim();

  if (message) {
    // console.log(message);
    socket.emit('chat message', {
      message,
      username,
    });

    // Clear the message input
    messageInput.value = '';
    sendButton.disabled = true;
  }
});
