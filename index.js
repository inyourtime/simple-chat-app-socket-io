import path from 'path';
import 'dotenv/config';

import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import fastifyIO from 'fastify-socket.io';

import socket from './socket/chat.js';
import user from './routes/user.js';

const __dirname = new URL('.', import.meta.url).pathname;
const PORT = process.env.PORT;

const fastify = Fastify();

fastify
  .register(fastifyIO)
  .register(FastifyStatic, {
    root: path.join(__dirname, 'public'),
  })
  .register(socket)
  .register(user)
  .listen({ port: PORT, host: '0.0.0.0' }, (err, addr) => {
    if (err) throw err;
    console.log(`Server is running on ${addr}`);
  });
