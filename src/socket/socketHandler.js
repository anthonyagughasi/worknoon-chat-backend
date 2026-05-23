const User = require('../models/User');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      socket.userId = userId;
      await User.findByIdAndUpdate(userId, { isOnline: true });
      io.emit('user_status_change', { userId, isOnline: true });
    }

    socket.on('join_room', (conversationId) => socket.join(conversationId));

    socket.on('typing_start', (data) => {
      socket.to(data.conversationId).emit('typing_status', { ...data, isTyping: true });
    });

    socket.on('typing_stop', (data) => {
      socket.to(data.conversationId).emit('typing_status', { conversationId: data.conversationId, isTyping: false });
    });

    socket.on('disconnect', async () => {
      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, { isOnline: false });
        io.emit('user_status_change', { userId: socket.userId, isOnline: false });
      }
    });
  });
};
