const chatMessages = document.getElementById('chatMessages');
const chatInputForm = document.getElementById('chatInputForm');
const chatInput = document.getElementById('chatInput');
const clearChatBtn = document.getElementById('clearChatBtn');
const aSelector = document.getElementById('A-selector');
const bSelector = document.getElementById('B-selector');
const chatHeader = document.querySelector('.chat-header');

let messageSender = 'A';

const updateSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${name} chatting...`;
  chatInput.placeholder = `Type here, ${name}...`;
  aSelector.classList.toggle('active', name === 'A');
  bSelector.classList.toggle('active', name === 'B');
};

// Event listeners for sender
aSelector.onclick = () => updateSender('A');
bSelector.onclick = () => updateSender('B');

// Fetch and display messages
const fetchMessages = async () => {
  const response = await fetch('/api/messages');
  const messages = await response.json();
  chatMessages.innerHTML = messages.map(createMessageHTML).join('');
};

// HTML for a single message
const createMessageHTML = (message) => `
  <div class="message ${message.sender === 'A' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div>${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

// Send new message
chatInputForm.onsubmit = async (e) => {
  e.preventDefault();
  const timestamp = new Date().toLocaleTimeString();
  const message = { sender: messageSender, text: chatInput.value, timestamp };

  await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });

  chatMessages.innerHTML += createMessageHTML(message);
  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Clear chat
clearChatBtn.onclick = async () => {
  await fetch('/api/messages', { method: 'DELETE' });
  chatMessages.innerHTML = '';
};

fetchMessages();
