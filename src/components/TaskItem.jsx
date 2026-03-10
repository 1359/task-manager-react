import { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function TaskItem({ task, onToggle, onDelete, onEdit, checkAdmin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { isDarkMode } = useTheme();

  const priorityColor = useMemo(() => {
    const colors = {
      high: '#ff4444',
      medium: '#ffaa00',
      low: '#44ff44'
    };
    return colors[task.priority] || '#999';
  }, [task.priority]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div style={{
      padding: '15px',
      margin: '10px 0',
      background: isDarkMode ? '#2c2c2c' : '#fff',
      border: `2px solid ${priorityColor}`,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => checkAdmin && onToggle(task.id)}
          style={{ marginRight: '10px', cursor: 'pointer', width: '20px', height: '20px' }}
        />

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            style={{
              flex: 1,
              padding: '5px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              color: isDarkMode ? '#fff' : '#000',
              background: isDarkMode ? '#444' : '#fff'
            }}
            autoFocus
          />
        ) : (
          <span style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: isDarkMode ? '#fff' : '#000',
            opacity: task.completed ? 0.6 : 1
          }}>
            {task.text}
          </span>
        )}

        <span style={{
          marginLeft: '10px',
          padding: '4px 8px',
          background: priorityColor,
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: '5px 10px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(task.text);
              }}
              style={{
                padding: '5px 10px',
                background: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '5px 10px',
                background: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                padding: '5px 10px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
