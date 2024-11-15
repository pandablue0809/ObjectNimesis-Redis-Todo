import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createUser = (name: string, email: string) =>
  api.post('/users', { name, email });

export const getUserById = (userId: string) =>
  api.get(`/users/${userId}`);

export const updateUser = (userId: string, data: { name?: string; email?: string }) =>
  api.put(`/users/${userId}`, data);

export const deleteUser = (userId: string) =>
  api.delete(`/users/${userId}`);

export const createTask = (userId: string, title: string, description: string) =>
  api.post(`/users/${userId}/tasks`, { title, description });

export const getTasksByUserId = (userId: string) =>
  api.get(`/users/${userId}/tasks`);

export const completeTask = (taskId: string) =>
  api.put(`/tasks/${taskId}/complete`);

export const deleteTask = (taskId: string) =>
  api.delete(`/tasks/${taskId}`);

export {};