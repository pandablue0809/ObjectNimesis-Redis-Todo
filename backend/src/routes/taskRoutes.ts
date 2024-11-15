import { FastifyInstance } from 'fastify';
import * as taskController from '../controllers/taskController';

export default async function taskRoutes(fastify: FastifyInstance) {
  fastify.post('/users/:userId/tasks', taskController.createTask);
  fastify.get('/users/:userId/tasks', taskController.getTasksByUserId);
  fastify.put('/tasks/:taskId/complete', taskController.completeTask);
  fastify.delete('/tasks/:taskId', taskController.deleteTask);
}