// src/controllers/taskController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { createTask, completeTask } from '../services/taskService';
import { Task } from '../types';

// Define the types for request params
interface CreateTaskParams {
  userId: string;
}

interface CompleteTaskParams {
  taskId: string;
}

export const createTaskHandler = async (
  request: FastifyRequest<{ Params: CreateTaskParams; Body: Task }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const task = request.body;

  const success = await createTask(userId, task);
  
  if (success) {
    reply.status(201).send({ message: 'Task created successfully' });
  } else {
    reply.status(500).send({ error: 'Error creating task' });
  }
};

export const completeTaskHandler = async (
  request: FastifyRequest<{ Params: CompleteTaskParams }>,
  reply: FastifyReply
) => {
  const { taskId } = request.params;
  
  const success = await completeTask(taskId);
  
  if (success) {
    reply.send({ message: 'Task marked as complete' });
  } else {
    reply.status(404).send({ error: 'Task not found or already completed' });
  }
};
