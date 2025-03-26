import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/todoSlice';
import './TaskInput.css';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text: text.trim(), priority }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="task-text-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput; 