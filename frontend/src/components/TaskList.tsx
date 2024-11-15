import React, { useEffect, useState } from 'react';
import { getTasksByUserId, completeTask, deleteTask } from '../api';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  userId: string;
  userName: string;
}

const TaskList: React.FC<TaskListProps> = ({ userId, userName }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasksByUserId(userId);
      setTasks(response.data);
    };
    fetchTasks();
  }, [userId]);

  const handleComplete = async (taskId: string) => {
    await completeTask(taskId);
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)));
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Tasks for <span className="text-green-700">{userName}</span></h2>
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center border-b border-gray-100 p-2 mb-2">
          <div>
            <p className={`text-lg ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
            <p>{task.description}</p>
          </div>
          <div>
            {!task.completed && (
              <button onClick={() => handleComplete(task.id)} className="text-white bg-blue-500 px-2 py-1 rounded mr-2">Complete</button>
            )}
            <button onClick={() => handleDelete(task.id)} className="text-white bg-red-500 px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
