import { redis } from '../redisClient';
import { Task } from '../types';

export const createTask = async (userId: string, task: Task): Promise<boolean> => {
  try {
    await redis.set(`task:${task.id}`, JSON.stringify(task));
    await redis.sadd(`user:${userId}:tasks`, task.id);  // Add task ID to the user's task set
    return true;
  } catch (error) {
    console.error('Error creating task:', error);
    return false;
  }
};

export const completeTask = async (taskId: string): Promise<boolean> => {
  try {
    const taskData = await redis.get(`task:${taskId}`);
    
    if (!taskData) {
      console.error(`Task with ID ${taskId} not found.`);
      return false;  // Task not found
    }

    const task: Task = JSON.parse(taskData);
    
    if (task.completed) {
      console.log(`Task with ID ${taskId} is already completed.`);
      return false;  // Task already completed
    }
    
    task.completed = true;
    await redis.set(`task:${taskId}`, JSON.stringify(task));
    return true;  // Task successfully marked as complete
  } catch (error) {
    console.error('Error completing task:', error);
    return false;
  }
};
