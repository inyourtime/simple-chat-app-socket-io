export default async function (fastify, opts) {
  fastify.get('/user', async (req, reply) => {
    return '/user';
  });
}
