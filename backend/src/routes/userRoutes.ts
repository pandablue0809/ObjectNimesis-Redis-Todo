import { FastifyInstance } from 'fastify';
import * as userController from '../controllers/userController';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', userController.createUser);
  fastify.get('/users', userController.getAllUsers); 
  fastify.get('/users/:userId', userController.getUserById);
  fastify.put('/users/:userId', userController.updateUser);
  fastify.delete('/users/:userId', userController.deleteUser);
}