// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let messages = [];

// Get messages
app.get('/api/messages', (req, res) => res.json(messages));

// Post a new message
app.post('/api/messages', (req, res) => {
  const { sender, text, timestamp } = req.body;
  messages.push({ sender, text, timestamp });
  res.status(201).json({ success: true });
});

// Clear all messages
app.delete('/api/messages', (req, res) => {
  messages = [];
  res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`HOI server running on http://localhost:${PORT}`));
