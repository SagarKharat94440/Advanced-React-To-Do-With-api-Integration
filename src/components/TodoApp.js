import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import TaskInput from './tasks/TaskInput';
import TaskList from './tasks/TaskList';
import './TodoApp.css';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="todo-app">
      <header className="app-header">
        <h1>Advanced Todo App</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <main className="app-main">
        <TaskInput />
        <TaskList />
      </main>
    </div>
  );
};

export default TodoApp; 