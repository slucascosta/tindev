const connectedUsers = { };

module.exports = function Socket(server) {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    const { user } = socket.handshake.query;
    
    connectedUsers[user] = socket.id;
  });

  return {
    io,
    connectedUsers
  }
}