import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTaskPriority: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.priority = priority;
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, toggleTask, updateTaskPriority, setTasks } = todoSlice.actions;
export default todoSlice.reducer; 