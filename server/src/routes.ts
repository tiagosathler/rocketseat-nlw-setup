import { FastifyInstance } from 'fastify';
import { createHabitController, getDayController } from './controllers';

export default async function appRoutes(app: FastifyInstance): Promise<void> {
  app.post('/habits', createHabitController);

  app.get('/day', getDayController);
}
