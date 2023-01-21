import { FastifyInstance } from 'fastify';
import {
  createHabitController,
  getDayController,
  toggleHabitController,
  getSummaryController } from './controllers';

export default async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post('/habit', createHabitController);

  app.get('/day', getDayController);

  app.patch('/habit/:id/toggle', toggleHabitController);

  app.get('/summary', getSummaryController);
}
