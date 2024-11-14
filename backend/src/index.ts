// src/index.ts
import Fastify from 'fastify';
import { createTaskHandler, completeTaskHandler } from './controllers/taskController';

const fastify = Fastify({
  logger: true
});

// Register routes
fastify.post('/users/:userId/tasks', createTaskHandler);
fastify.put('/tasks/:taskId/complete', completeTaskHandler);

// Start the server
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
