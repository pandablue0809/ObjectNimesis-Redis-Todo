import { redis } from '../redisClient';
import { User } from '../types/index';

// Create a user
export const createUser = async (user: User): Promise<void> => {
  await redis.set(`user:${user.id}`, JSON.stringify(user));
};

// Get a user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
  const userData = await redis.get(`user:${userId}`);
  return userData ? JSON.parse(userData) : null;
};

// Update a user by ID
export const updateUser = async (userId: string, name: string): Promise<void> => {
  const user = await getUserById(userId);
  if (user) {
    user.name = name;
    await redis.set(`user:${userId}`, JSON.stringify(user));
  }
};

// Delete a user by ID
export const deleteUser = async (userId: string): Promise<void> => {
  await redis.del(`user:${userId}`);
};