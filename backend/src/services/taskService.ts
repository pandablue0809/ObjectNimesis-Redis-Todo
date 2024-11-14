import { redis } from '../redisClient';
import { Task } from '../types';

// Create a task
export const createTask = async (task: Task): Promise<void> => {
  await redis.set(`task:${task.id}`, JSON.stringify(task));
};

// Get a task by ID
export const getTaskById = async (taskId: string): Promise<Task | null> => {
  const taskData = await redis.get(`task:${taskId}`);
  return taskData ? JSON.parse(taskData) : null;
};

// Update task status to completed
export const completeTask = async (taskId: string): Promise<void> => {
  const task = await getTaskById(taskId);
  if (task) {
    task.completed = true;
    await redis.set(`task:${taskId}`, JSON.stringify(task));
  }
};

// Delete a task by ID
export const deleteTask = async (taskId: string): Promise<void> => {
  await redis.del(`task:${taskId}`);
};
