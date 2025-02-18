
// // server/index.js

// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');

// const app = express();
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('  ', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   socketId: String,
//   room: String,
// });

// // Define Message Schema
// const messageSchema = new mongoose.Schema({
//   room: String,
//   username: String,
//   message: String,
//   __createdtime__: Date,
// });

// // Create Models
// const User = mongoose.model('User', userSchema);
// const Message = mongoose.model('Message', messageSchema);

// const server = http.createServer(app);

// // Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// const CHAT_BOT = 'ChatBot';

// // Listen for socket.io connections
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // When a user joins a room
//   socket.on('join_room', async (data) => {
//     const { username, room } = data;
//     socket.join(room);

//     // Save the user in MongoDB
//     const newUser = new User({ username, socketId: socket.id, room });
//     await newUser.save();

//     let __createdtime__ = Date.now();

//     // Notify other users in the room
//     socket.to(room).emit('receive_message', {
//       message: `${username} has joined the chat room`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });

//     // Send welcome message to the user who joined
//     socket.emit('receive_message', {
//       message: `Welcome ${username}`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });

//     // Fetch previous messages for the room
//     const previousMessages = await Message.find({ room }).sort({ __createdtime__: 1 });
//     socket.emit('previous_messages', previousMessages);
//   });

//   // Listen for new messages
//   socket.on('send_message', async (data) => {
//     const { room, username, message } = data;
//     const __createdtime__ = Date.now();

//     // Save message in MongoDB
//     const newMessage = new Message({ room, username, message, __createdtime__ });
//     await newMessage.save();

//     // Send message to all users in the room
//     io.in(room).emit('receive_message', { username, message, __createdtime__ });
//   });

//   // Listen for when a user leaves a room (by their own request)
//   socket.on('leave_room', async (data) => {
//     const { username, room } = data;

//     // Remove the user from the room
//     socket.leave(room);

//     const __createdtime__ = Date.now();
    
//     // Send leave message to other users
//     io.to(room).emit('receive_message', {
//       message: `${username} has left the chat room`,
//       username: CHAT_BOT,
//       __createdtime__,
//     });

//     // Remove user from MongoDB
//     await User.findOneAndDelete({ socketId: socket.id });

//     // Update the list of users in the room
//     const chatRoomUsers = await User.find({ room });
//     io.in(room).emit('chatroom_users', chatRoomUsers);
//   });

//   // When a user disconnects
//   socket.on('disconnect', async () => {
//     console.log(`User disconnected: ${socket.id}`);

//     // Remove user from MongoDB and emit updated user list to the room
//     const user = await User.findOneAndDelete({ socketId: socket.id });
//     if (user) {
//       socket.to(user.room).emit('receive_message', {
//         message: `${user.username} has left the chat room`,
//         username: CHAT_BOT,
//         __createdtime__: Date.now(),
//       });

//       // Update the list of users in the room
//       const chatRoomUsers = await User.find({ room: user.room });
//       io.in(user.room).emit('chatroom_users', chatRoomUsers);
//     }
//   });
// });

// server.listen(4000, () => console.log('Server is running on port 4000'));




// // filepath: /C:/Users/rajan/OneDrive/Desktop/chat-app/server/index.js
// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const path = require('path');

// const app = express();
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   socketId: String,
//   room: String,
// });

// // Define Message Schema
// const messageSchema = new mongoose.Schema({
//   room: String,
//   username: String,
//   message: String,
//   __createdtime__: Date,
// });

// // Create Models
// const User = mongoose.model('User', userSchema);
// const Message = mongoose.model('Message', messageSchema);

// const server = http.createServer(app);

// // Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// const CHAT_BOT = 'ChatBot';

// // Listen for socket.io connections
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // When a user joins a room
//   socket.on('join_room', async (data) => {
//     try {
//       const { username, room } = data;
//       socket.join(room);

//       // Save the user in MongoDB
//       const newUser = new User({ username, socketId: socket.id, room });
//       await newUser.save();

//       let __createdtime__ = Date.now();

//       // Notify other users in the room
//       socket.to(room).emit('receive_message', {
//         message: `${username} has joined the chat room`,
//         username: CHAT_BOT,
//         __createdtime__,
//       });

//       // Send welcome message to the user who joined
//       socket.emit('receive_message', {
//         message: `Welcome ${username}`,
//         username: CHAT_BOT,
//         __createdtime__,
//       });

//       // Fetch previous messages for the room
//       const previousMessages = await Message.find({ room }).sort({ __createdtime__: 1 });
//       socket.emit('previous_messages', previousMessages);
//     } catch (error) {
//       console.error('Error in join_room event:', error);
//     }
//   });

//   // Listen for new messages
//   socket.on('send_message', async (data) => {
//     try {
//       const { room, username, message } = data;
//       const __createdtime__ = Date.now();

//       // Save message in MongoDB
//       const newMessage = new Message({ room, username, message, __createdtime__ });
//       await newMessage.save();

//       // Send message to all users in the room
//       io.in(room).emit('receive_message', { username, message, __createdtime__ });
//     } catch (error) {
//       console.error('Error in send_message event:', error);
//     }
//   });

//   // Listen for when a user leaves a room (by their own request)
//   socket.on('leave_room', async (data) => {
//     try {
//       const { username, room } = data;

//       // Remove the user from the room
//       socket.leave(room);

//       const __createdtime__ = Date.now();
      
//       // Send leave message to other users
//       io.to(room).emit('receive_message', {
//         message: `${username} has left the chat room`,
//         username: CHAT_BOT,
//         __createdtime__,
//       });

//       // Remove user from MongoDB
//       await User.findOneAndDelete({ socketId: socket.id });

//       // Update the list of users in the room
//       const chatRoomUsers = await User.find({ room });
//       io.in(room).emit('chatroom_users', chatRoomUsers);
//     } catch (error) {
//       console.error('Error in leave_room event:', error);
//     }
//   });

//   // When a user disconnects
//   socket.on('disconnect', async () => {
//     try {
//       console.log(`User disconnected: ${socket.id}`);

//       // Remove user from MongoDB and emit updated user list to the room
//       const user = await User.findOneAndDelete({ socketId: socket.id });
//       if (user) {
//         socket.to(user.room).emit('receive_message', {
//           message: `${user.username} has left the chat room`,
//           username: CHAT_BOT,
//           __createdtime__: Date.now(),
//         });

//         // Update the list of users in the room
//         const chatRoomUsers = await User.find({ room: user.room });
//         io.in(user.room).emit('chatroom_users', chatRoomUsers);
//       }
//     } catch (error) {
//       console.error('Error in disconnect event:', error);
//     }
//   });
// });

// // Serve the React app
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

// server.listen(4000, () => console.log('Server is running on port 4000'));










require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  socketId: String,
  room: String,
});

// Define Message Schema
const messageSchema = new mongoose.Schema({
  room: String,
  username: String,
  message: String,
  __createdtime__: Date,
});

// Create Models
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);

const server = http.createServer(app);

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'ChatBot';

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a user joins a room
  socket.on('join_room', async (data) => {
    try {
      const { username, room } = data;
      socket.join(room);

      // Save the user in MongoDB
      const newUser = new User({ username, socketId: socket.id, room });
      await newUser.save();

      let __createdtime__ = Date.now();

      // Notify other users in the room
      socket.to(room).emit('receive_message', {
        message: `${username} has joined the chat room`,
        username: CHAT_BOT,
        __createdtime__,
      });

      // Send welcome message to the user who joined
      socket.emit('receive_message', {
        message: `Welcome ${username}`,
        username: CHAT_BOT,
        __createdtime__,
      });

      // Fetch previous messages for the room
      const previousMessages = await Message.find({ room }).sort({ __createdtime__: 1 });
      socket.emit('previous_messages', previousMessages);
    } catch (error) {
      console.error('Error in join_room event:', error);
    }
  });

  // Listen for new messages
  socket.on('send_message', async (data) => {
    try {
      const { room, username, message } = data;
      const __createdtime__ = Date.now();

      // Save message in MongoDB
      const newMessage = new Message({ room, username, message, __createdtime__ });
      await newMessage.save();

      // Send message to all users in the room
      io.in(room).emit('receive_message', { username, message, __createdtime__ });
    } catch (error) {
      console.error('Error in send_message event:', error);
    }
  });

  // Listen for when a user leaves a room (by their own request)
  socket.on('leave_room', async (data) => {
    try {
      const { username, room } = data;

      // Remove the user from the room
      socket.leave(room);

      const __createdtime__ = Date.now();
      
      // Send leave message to other users
      io.to(room).emit('receive_message', {
        message: `${username} has left the chat room`,
        username: CHAT_BOT,
        __createdtime__,
      });

      // Remove user from MongoDB
      await User.findOneAndDelete({ socketId: socket.id });

      // Update the list of users in the room
      const chatRoomUsers = await User.find({ room });
      io.in(room).emit('chatroom_users', chatRoomUsers);
    } catch (error) {
      console.error('Error in leave_room event:', error);
    }
  });

  // When a user disconnects
  socket.on('disconnect', async () => {
    try {
      console.log(`User disconnected: ${socket.id}`);

      // Remove user from MongoDB and emit updated user list to the room
      const user = await User.findOneAndDelete({ socketId: socket.id });
      if (user) {
        socket.to(user.room).emit('receive_message', {
          message: `${user.username} has left the chat room`,
          username: CHAT_BOT,
          __createdtime__: Date.now(),
        });

        // Update the list of users in the room
        const chatRoomUsers = await User.find({ room: user.room });
        io.in(user.room).emit('chatroom_users', chatRoomUsers);
      }
    } catch (error) {
      console.error('Error in disconnect event:', error);
    }
  });
});

// Serve the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(4000, () => console.log('Server is running on port 4000'));