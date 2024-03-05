export default async function (fastify) {
  const users = {};
  const messages = [];

  fastify.io.on('connection', (socket) => {
    console.info('Socket connected!', socket.id);
    users[socket.id] = {
      name: `Name:${socket.id}`,
    };
    fastify.io.emit('chat message', messages);
    socket.on('chat message', (msg) => {
      messages.push({
        name: msg.username,
        message: msg.message,
      });
      fastify.io.emit('chat message', messages);
    });
  });
}
