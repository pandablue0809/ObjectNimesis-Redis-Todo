import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from '../services/userService';
import { User } from '../types/index';

// Create a user
export const createUser = async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply): Promise<void> => {
  const user = request.body;
  await userService.createUser(user);
  reply.code(201).send({ message: 'User created', id: user.id });
};

// Get a user by ID
export const getUserById = async (request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply): Promise<void> => {
  const { userId } = request.params;
  const user = await userService.getUserById(userId);
  if (user) {
    reply.send(user);
  } else {
    reply.code(404).send({ message: 'User not found' });
  }
};

// Update a user by ID
export const updateUser = async (request: FastifyRequest<{ Params: { userId: string }; Body: { name: string } }>, reply: FastifyReply): Promise<void> => {
  const { userId } = request.params;
  const { name } = request.body;
  await userService.updateUser(userId, name);
  reply.send({ message: 'User updated' });
};

// Delete a user by ID
export const deleteUser = async (request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply): Promise<void> => {
  const { userId } = request.params;
  await userService.deleteUser(userId);
  reply.send({ message: 'User deleted' });
};