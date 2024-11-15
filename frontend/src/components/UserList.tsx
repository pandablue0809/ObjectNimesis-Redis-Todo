import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';

interface UserListProps {
  onSelect: (userId: string, userName: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelect }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  return (
    <div className="mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">User List</h2>
      <ul>
        {users.map((user) => (
          <li onClick={() => onSelect(user.id, user.name)}  key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <button className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
