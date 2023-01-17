import Fastify from 'fastify';

const app = Fastify();

app.get('/', () => 'Hello world!');

app
  .listen({
    port: 3333,
  })
  .catch(() => {
    console.error('Couldn\'t listen');
  });
