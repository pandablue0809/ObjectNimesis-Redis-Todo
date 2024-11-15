export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}
  
export interface User {
  id: string;
  name: string;
  email: string;
}