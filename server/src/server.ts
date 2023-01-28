/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import appRoutes from './routes';
// import notificationRoutes from './notifications-routes';

import './lib/dayjs';
import { host, port, address } from './lib/ip';
import createEnvFiles from './lib/fs';

createEnvFiles(address);

const app = Fastify();

app.register(cors);
app.register(appRoutes);
// app.register(notificationRoutes);

app
  .listen({
    port,
    host,
  })
  .then(() => {
    console.log(`HTTP Server listing on port http://${host}:3333`);
  })
  .catch(() => {
    console.error('Couldn\'t listen');
  });
