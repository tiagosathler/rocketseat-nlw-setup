import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createHabitService, getDayService } from '../services';

async function createHabitController(request: FastifyRequest): Promise<void> {
  const createHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(
      z.number().min(0).max(6),
    ),
  });

  const { title, weekDays } = createHabitBody.parse(request.body);

  await createHabitService({ title, weekDays });
}

async function getDayController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getDayParams = z.object({
    date: z.coerce.date(),
  });

  const { date } = getDayParams.parse(request.query);

  const response = await getDayService({ date });

  return reply.status(200).send(response);
}

export {
  createHabitController,
  getDayController,
};
