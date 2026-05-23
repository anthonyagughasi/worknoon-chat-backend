const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authController = require('./src/controllers/authController');
const chatController = require('./src/controllers/chatController');
const { protect, authorizeRoles } = require('./src/middleware/auth');
const upload = require('./src/middleware/upload');
const socketHandler = require('./src/socket/socketHandler');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database verification completely successful'))
  .catch(err => console.error('Database linking unexpected termination:', err));

// Auth Endpoint Interface
app.post('/api/auth/signup', authController.registerUser);
app.post('/api/auth/login', authController.loginUser);

// Core Data Routing Interface
app.post('/api/conversations', protect, chatController.createConversation);
app.post('/api/messages', protect, upload.single('file'), chatController.sendMessage);
app.get('/api/messages/:conversationId', protect, chatController.getMessages);

const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
socketHandler(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Application context completely deployed over port ${PORT}`));
