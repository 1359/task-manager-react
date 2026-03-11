import { useEffect, useCallback, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import "./App.css";

function AppContent() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("Amirhossein");
  const [completedTask, setCompletedTask] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isDarkMode } = useTheme();
  const teacherFamily = "Moqaddasi";
  const [statusButton, setStatusButton] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskManagerTasks");
    console.log("fetch", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    const completedTask = tasks.filter((t) => t.completed).length;
    //console.log("App mounted! Total tasks:", tasks.length);
    document.title = `${tasks.length} tasks),completedTask:${completedTask}`;
    if (tasks.length > 0) {
      localStorage.setItem("taskManagerTasks", JSON.stringify(tasks));
    }
    console.log("tasks:", tasks);

    return () => {
      //console.log("App unmounting...");
    };
  }, [tasks]);

  useEffect(() => {
    // isDarkMode ? console.log("Dark mode") : console.log("Light mode");
  }, [isDarkMode]);

  const handleAddTask = useCallback(
    (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const handleToggleTask = useCallback(
    (id) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const handleEditTask = useCallback(
    (id, newText) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
      setName("Akram");
    },
    [setTasks]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDarkMode ? "#0a5c2c" : "#9b0d0d",
        transition: "background 0.3s ease",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: isDarkMode ? "#222" : "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Header
          title="React Learning: Task Manager"
          taskCount={tasks.length}
          teacherName="Amir"
          teacherFamily={teacherFamily}
          firstName={name}
          setIsAdmin={setIsAdmin}
          checkAdmin={isAdmin}
        />

        <div style={{ padding: "20px" }}>
          <TaskForm onAddTask={handleAddTask} checkAdmin={isAdmin} />

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
