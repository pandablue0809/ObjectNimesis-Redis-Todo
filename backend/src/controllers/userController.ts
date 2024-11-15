import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '../redisClient';
import { User } from '../types';

// Create a new user
export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email } = request.body as { name: string; email: string };

  const user: User = { id: uuidv4(), name, email };

  await redis.set(`user:${user.id}`, JSON.stringify(user));
  reply.send(user);
};

// Fetch all users
export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const keys = await redis.keys('user:*');
  const users = await Promise.all(
    keys.map(async (key) => {
      const user = await redis.get(key);
      return user ? JSON.parse(user) : null;
    })
  );

  reply.send(users.filter(Boolean)); // Remove null values if any
};

// Fetch a user by ID
export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as { userId: string };
  const user = await redis.get(`user:${userId}`);

  if (user) {
    reply.send(JSON.parse(user));
  } else {
    reply.status(404).send({ message: 'User not found' });
  }
};

// Update a user
export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as { userId: string };
  const { name, email } = request.body as { name: string; email: string };
  const user = await redis.get(`user:${userId}`);

  if (user) {
    const updatedUser = { ...JSON.parse(user), name, email };
    await redis.set(`user:${userId}`, JSON.stringify(updatedUser));
    reply.send(updatedUser);
  } else {
    reply.status(404).send({ message: 'User not found' });
  }
};

// Delete a user
export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as { userId: string };
  const userExists = await redis.get(`user:${userId}`);

  if (userExists) {
    await redis.del(`user:${userId}`);
    reply.send({ message: 'User deleted successfully' });
  } else {
    reply.status(404).send({ message: 'User not found' });
  }
};
