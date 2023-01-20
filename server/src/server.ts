/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import ip from 'ip';
import appRoutes from './routes';

const host = ip.address();

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: 3333,
    host,
  })
  .then(() => {
    console.log(`HTTP Server listing on port http://${host}:3333`);
  })
  .catch(() => {
    console.error('Couldn\'t listen');
  });
