import React from 'react';
import { deleteUser } from '../api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  onSelect: (userId: string, userName: string) => void;
  users: User[];
  onUserDeleted: (userId: string) => void; 
}

const UserList: React.FC<UserListProps> = ({ users, onSelect, onUserDeleted }) => {
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      onUserDeleted(userId);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">User List</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelect(user.id, user.name)}
            className="flex justify-between items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteUser(user.id);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
