import { FastifyRequest, FastifyReply } from 'fastify';
import { Task } from '../types/index';
import { redis } from '../redisClient';

// Create a task
export const createTask = async (request: FastifyRequest<{ Params: { userId: string }; Body: Task }>, reply: FastifyReply): Promise<void> => {
  const { userId } = request.params;
  const { title, description } = request.body;
  const taskId = `task:${userId}:${Date.now()}`;
  const task: Task = {
    id: taskId,
    userId,
    title,
    description,
    completed: false
  };
  await redis.set(taskId, JSON.stringify(task));

  reply.code(201).send({ message: 'Task created', task });
};

//Get tasks by UserID

export const getTasksByUserId = async (
  request: FastifyRequest<{ Params: { userId: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;

  try {
    const keys = await redis.keys(`task:${userId}:*`);

    if (keys.length === 0) {
      return reply.code(200).send([]);
    }

    const tasksData = await redis.mget(keys);
    const tasks = tasksData.map((taskData) => JSON.parse(taskData!));

    return reply.code(200).send(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    reply.code(500).send({ message: 'Error fetching tasks' });
  }
};

export const completeTask = async (
  request: FastifyRequest<{ Params: { taskId: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = request.params;

  try {
    const taskData = await redis.get(taskId);

    if (!taskData) {
      return reply.code(404).send({ message: 'Task not found' });
    }

    const task = JSON.parse(taskData);
    task.completed = true;

    await redis.set(taskId, JSON.stringify(task));

    return reply.code(200).send({ message: 'Task marked as complete', task });
  } catch (error) {
    console.error('Error completing task:', error);
    return reply.code(500).send({ message: 'Error marking task as complete' });
  }
};

export const deleteTask = async (
  request: FastifyRequest<{ Params: { taskId: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = request.params; 

  try {
    const taskData = await redis.get(taskId);
    console.log("___________taskData______________", taskData)
    if (!taskData) {
      return reply.code(404).send({ message: 'Task not found' });
    }

    await redis.del(taskId);

    return reply.code(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return reply.code(500).send({ message: 'Error deleting task' });
  }
};

// Get a task by ID
// export const getTaskById = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
//   const { taskId } = request.params;
//   const task = await taskService.getTaskById(taskId);
//   if (task) {
//     reply.send(task);
//   } else {
//     reply.code(404).send({ message: 'Task not found' });
//   }
// };

// // Complete a task
// export const completeTask = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
//   const { taskId } = request.params;
//   await taskService.completeTask(taskId);
//   reply.send({ message: 'Task marked as completed' });
// };

// // Delete a task
// export const deleteTask = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
//   const { taskId } = request.params;
//   await taskService.deleteTask(taskId);
//   reply.send({ message: 'Task deleted' });
// };