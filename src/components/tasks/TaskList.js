import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, updateTaskPriority, setTasks } from '../../store/slices/todoSlice';
import { fetchWeather } from '../../store/slices/weatherSlice';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.tasks);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      dispatch(setTasks(JSON.parse(savedTasks)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggle = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const handlePriorityChange = (taskId, priority) => {
    dispatch(updateTaskPriority({ id: taskId, priority }));
  };

  const handleWeatherCheck = (city) => {
    dispatch(fetchWeather(city));
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add some tasks to get started!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onPriorityChange={handlePriorityChange}
            onWeatherCheck={handleWeatherCheck}
          />
        ))
      )}
    </div>
  );
};

export default TaskList; 