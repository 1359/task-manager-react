import { useEffect, useCallback, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

function AppContent() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("Amirhossein");
  const [completedTask, setCompletedTask] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isDarkMode } = useTheme();
  const teacherFamily = "Moqaddasi";

  useEffect(() => {
    console.log('App mounted! Total tasks:', tasks.length);
    document.title = `Task Manager (${tasks.length} tasks)`;

    return () => {
      console.log('App unmounting...');
    };
  }, [tasks.length]);

  const handleAddTask = useCallback((newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  const handleToggleTask = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const handleDeleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  const handleEditTask = useCallback((id, newText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setName("Akram");
  }, [setTasks]);

  return (
    <div style={{
      minHeight: '100vh',
      background: isDarkMode ? '#0a5c2c' : '#9b0d0d',
      transition: 'background 0.3s ease',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: isDarkMode ? '#222' : '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <Header
          title="React Learning: Task Manager"
          taskCount={tasks.length}
          teacherName="Amir"
          teacherFamily={teacherFamily}
          firstName={name}
          setIsAdmin={setIsAdmin}
          checkAdmin={isAdmin}


        />

        <div style={{ padding: '20px' }}>
          <TaskForm onAddTask={handleAddTask} />

          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            checkAdmin={isAdmin}

          />

        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
