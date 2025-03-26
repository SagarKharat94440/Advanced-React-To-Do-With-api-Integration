import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TaskItem.css';

const TaskItem = ({ task, onDelete, onToggle, onPriorityChange, onWeatherCheck }) => {
  const [showWeather, setShowWeather] = useState(false);
  const weather = useSelector((state) => state.weather.data);
  const weatherLoading = useSelector((state) => state.weather.loading);
  const weatherError = useSelector((state) => state.weather.error);

  const handleWeatherClick = () => {
    setShowWeather(!showWeather);
    if (!showWeather && !weather) {
      onWeatherCheck('London'); // Default city, you can modify this
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#2BBBAD';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
        <div
          className="priority-indicator"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        />
      </div>
      
      <div className="task-actions">
        <select
          value={task.priority}
          onChange={(e) => onPriorityChange(task.id, e.target.value)}
          className="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={handleWeatherClick}
          className="weather-btn"
        >
          {showWeather ? 'Hide Weather' : 'Check Weather'}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>

      {showWeather && (
        <div className="weather-info">
          {weatherLoading && <p>Loading weather...</p>}
          {weatherError && <p className="error">Error: {weatherError}</p>}
          {weather && (
            <div className="weather-details">
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem; 