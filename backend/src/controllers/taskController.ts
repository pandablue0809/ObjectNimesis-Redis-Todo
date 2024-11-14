import { FastifyRequest, FastifyReply } from 'fastify';
import * as taskService from '../services/taskService';
import { Task } from '../types/index';

// Create a task
export const createTask = async (request: FastifyRequest<{ Params: { userId: string }; Body: Task }>, reply: FastifyReply): Promise<void> => {
  const { userId } = request.params;
  const task = request.body;
  task.userId = userId;
  await taskService.createTask(task);
  reply.code(201).send({ message: 'Task created', id: task.id });
};

// Get a task by ID
export const getTaskById = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
  const { taskId } = request.params;
  const task = await taskService.getTaskById(taskId);
  if (task) {
    reply.send(task);
  } else {
    reply.code(404).send({ message: 'Task not found' });
  }
};

// Complete a task
export const completeTask = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
  const { taskId } = request.params;
  await taskService.completeTask(taskId);
  reply.send({ message: 'Task marked as completed' });
};

// Delete a task
export const deleteTask = async (request: FastifyRequest<{ Params: { taskId: string } }>, reply: FastifyReply): Promise<void> => {
  const { taskId } = request.params;
  await taskService.deleteTask(taskId);
  reply.send({ message: 'Task deleted' });
};