import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [userId, setUserId] = useState(''); 
  const [userName, setUserName] = useState(''); 

  const handleUserSelect = (id: string , name:string) => {
    setUserId(id);
    setUserName(name);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className='max-w-[1280px] m-auto'>
        <h1 className="text-center text-4xl py-8">Task Management</h1>
        <div className='flex'>
          <div className='w-[50%] px-2'>
            <UserForm />
            <UserList onSelect={handleUserSelect}/> 
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
