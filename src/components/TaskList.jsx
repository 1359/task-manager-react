import { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import { useTheme } from '../contexts/ThemeContext';

function TaskList({ tasks, onToggle, onDelete, onEdit, checkAdmin}) {
  const [filter, setFilter] = useState('all');
  const { isDarkMode } = useTheme();

 const filteredTasks = useMemo(() => {
    let filtered;

    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }

    if (!checkAdmin) {
      filtered = filtered.filter(task => task.priority !== 'high');
    }

    return filtered;
  }, [tasks, filter, checkAdmin]);


  const stats = useMemo(() => ({
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  }), [tasks]);

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        padding: '15px',
        background: isDarkMode ? '#2c2c2c' : '#f5f5f5',
        borderRadius: '8px'
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 16px',
            background: filter === 'all' ? '#4CAF50' : '#ddd',
            color: filter === 'all' ? 'white' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: filter === 'all' ? 'bold' : 'normal'
          }}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{
            padding: '8px 16px',
            background: filter === 'active' ? '#2196F3' : '#ddd',
            color: filter === 'active' ? 'white' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: filter === 'active' ? 'bold' : 'normal'
          }}
        >
          Active ({stats.active})
        </button>
        {checkAdmin &&
        <button
          onClick={() => setFilter('completed')}
          style={{
            padding: '8px 16px',
            background: filter === 'completed' ? '#FF9800' : '#ddd',
            color: filter === 'completed' ? 'white' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: filter === 'completed' ? 'bold' : 'normal'
          }}
        >
          Completed ({stats.completed})
        </button>
        }
      </div>
      

      {filteredTasks.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: isDarkMode ? '#999' : '#666',
          fontSize: '18px'
        }}>
          {filter === 'all'
            ? 'No tasks yet. Add your first task above!'
            : `No ${filter} tasks.`}
        </div>
      ) : (
        <div>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              checkAdmin={checkAdmin}

            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
