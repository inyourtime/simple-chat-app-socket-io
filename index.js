import path from 'path';
import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import fastifyIO from 'fastify-socket.io';

const __dirname = new URL('.', import.meta.url).pathname;
const PORT = 3000;

const users = {};
const messages = [];

const fastify = Fastify();

fastify.register(fastifyIO);

fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.get('/me', (req, reply) => {
  fastify.io.emit('hello', 'สวัสดี');
  return 'eiei';
});

fastify.ready((err) => {
  if (err) throw err;

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
});

fastify.listen({ port: PORT, host: '0.0.0.0' });

console.log(`Server is running on http://localhost:${PORT}`);
