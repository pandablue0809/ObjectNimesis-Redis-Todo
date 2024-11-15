import React, { useState , useEffect} from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getUsers } from './api';

interface User {
  id: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState(''); 
  const [userName, setUserName] = useState(''); 

  const handleUserSelect = (id: string , name:string) => {
    setUserId(id);
    setUserName(name);
  };

  const addUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const handleUserDeleted = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className='max-w-[1280px] m-auto'>
        <h1 className="text-center text-4xl py-8">Task Management</h1>
        <div className='flex'>
          <div className='w-[50%] px-2'>
            <UserForm onUserCreated={addUser}/>
            <UserList users={users} onSelect={handleUserSelect} onUserDeleted={handleUserDeleted}/> 
          </div>
          <div className='w-[50%] px-2'>
            {userId && (
              <>
                <TaskForm userId={userId} userName={userName}/>
                <TaskList userId={userId} userName={userName} />
              </>
            )}
          </div>  
        </div>      
      </div>      
    </div>
  );
};

export default App;
