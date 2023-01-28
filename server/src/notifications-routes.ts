/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

import WebPush from 'web-push';
import { address } from './lib/ip';

const { publicKey, privateKey } = WebPush.generateVAPIDKeys();

WebPush.setVapidDetails(address, publicKey, privateKey);

export default async function notificationRoutes(app: FastifyInstance): Promise<void> {
  app.get(
    '/push/public_key',
    (_request: FastifyRequest, reply: FastifyReply) => reply.status(200).send({ publicKey }),
  );

  app.post('/push/register', (request: FastifyRequest, reply: FastifyReply) => {
    // criar uma tabela para armazenar a subscrição com o usuário logado
    // ex: tabela UserNotificationSubscriptions
    console.log(request.body);
    return reply.status(201).send();
  });

  app.post('/push/send', async (request: FastifyRequest, reply: FastifyReply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Hello from Backend after 5s');
    }, 5000);

    return reply.status(201).send();
  });
}
