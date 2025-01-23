const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  username: { type: String, required: true },
  room: { type: String, required: true },
  __createdtime__: { type: Date, required: true },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
