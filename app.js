//selectors for A and B
const aSelectorBtn = document.querySelector('#A-selector');
const bSelectorBtn = document.querySelector('#B-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'A' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.insertAdjacentHTML('beforeend', createChatMessageElement(message));
  });
};

let messageSender = 'A';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === 'A') {
    aSelectorBtn.classList.add('active-person');
    bSelectorBtn.classList.remove('active-person');
  }
  if (name === 'B') {
    bSelectorBtn.classList.add('active-person');
    aSelectorBtn.classList.remove('active-person');
  }

  chatInput.focus();
};

aSelectorBtn.onclick = () => updateMessageSender('A');
bSelectorBtn.onclick = () => updateMessageSender('B');

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  chatMessages.insertAdjacentHTML('beforeend', createChatMessageElement(message));
  chatInputForm.reset();
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
