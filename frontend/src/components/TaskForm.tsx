import React, { useState } from 'react';
import { createTask } from '../api';

interface TaskFormProps {
  userId: string;
  userName: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ userId, userName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(userId, title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4">Create Task for <span className="text-green-700">{userName}</span></h2>
      <input className="border px-2 py-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input className="border px-2 py-1 mt-2 ml-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Add Task</button>
    </form>
  );
};

export default TaskForm;
