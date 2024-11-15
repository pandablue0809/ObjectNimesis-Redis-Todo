import React, { useState } from 'react';
import { createUser } from '../api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserFormProps {
  onUserCreated: (newUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (async () => {
    const newUser = await createUser( name, email );
    console.log(newUser)
    onUserCreated(newUser.data);
    setName('');
    setEmail('');
  });

  return (
    <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4">Create User</h2>
      <input className="border px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input className="border px-2 py-1 mt-2 ml-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default UserForm;
