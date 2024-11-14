import Fastify from 'fastify';
import * as userController from './controllers/userController'
import * as taskController from './controllers/taskController';

const fastify = Fastify({
  logger: true
});

// User routes
fastify.post('/users', userController.createUser);
fastify.get('/users/:userId', userController.getUserById);
fastify.put('/users/:userId', userController.updateUser);
fastify.delete('/users/:userId', userController.deleteUser);

// Task routes
fastify.post('/users/:userId/tasks', taskController.createTask);
fastify.get('/tasks/:taskId', taskController.getTaskById);
fastify.put('/tasks/:taskId/complete', taskController.completeTask);
fastify.delete('/tasks/:taskId', taskController.deleteTask);

// Start the server
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
