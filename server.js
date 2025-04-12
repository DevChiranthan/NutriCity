const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Add this middleware to handle client-side routing
app.use((req, res, next) => {
  // Skip API routes and static files
  if (req.url.startsWith('/api') || req.url.startsWith('/uploads')) {
    return next();
  }
  
  // Check if the request accepts HTML
  const acceptsHTML = req.headers.accept && req.headers.accept.includes('text/html');
  
  // For page refreshes or direct navigation, send the index.html
  if (acceptsHTML) {
    // In production, serve from the frontend/dist directory
    if (process.env.NODE_ENV === 'production') {
      return res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    }
  }
  
  next();
});

// Development route (this should come after the middleware above)
app.get('/', (req, res) => {
  res.send('Chat API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});