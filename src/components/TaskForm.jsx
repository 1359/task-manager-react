import { useState, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

function TaskForm({
  onAddTask,
  checkAdmin,
  searchTerm,
  setSearchTerm,
  isFiltering,
}) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");
  const inputRef = useRef(null);
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskText.trim()) {
      onAddTask({
        id: Date.now(),
        text: taskText,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      });

      setTaskText("");
      setPriority("medium");
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        background: isDarkMode ? "#2c2c2c" : "#f5f5f5",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            color: isDarkMode ? "#fff" : "#000",
            background: isDarkMode ? "#444" : "#fff",
          }}
        />
        {isFiltering && <p> Is filtering...</p>}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          ref={inputRef}
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            color: isDarkMode ? "#fff" : "#000",
            background: isDarkMode ? "#444" : "#fff",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <label style={{ color: isDarkMode ? "#fff" : "#000" }}>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            color: isDarkMode ? "#fff" : "#000",
            background: isDarkMode ? "#444" : "#fff",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          {checkAdmin && <option value="high">High</option>}
        </select>

        <button
          type="submit"
          style={{
            padding: "8px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
