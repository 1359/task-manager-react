import { useTheme } from '../contexts/ThemeContext';

function Header({ title, taskCount, teacherName, teacherFamily, firstName, setIsAdmin, checkAdmin }) {
  const { isDarkMode, toggleTheme } = useTheme();
  function handleCheckBoxChange(event) {
    console.log("event", event);
    setIsAdmin(event.target.checked);
  }

  return (
    <header style={{
      padding: '20px',
      background: isDarkMode ? '#333' : '#17a31e',
      color: 'white',
      borderRadius: '8px 8px 0 0'
    }}>
      <h1>{title}</h1>
      <p>Total Tasks: {taskCount}</p>
      <p>Teacher: {teacherName}</p>
      <p>teacherFamily: {teacherFamily}</p>
      <p>name: {firstName}</p>
      <input type="checkbox" onChange={handleCheckBoxChange} />
      <p>"Admin: {checkAdmin ? 'isHere' : 'isNotHere'}"</p>
      <br />

      <button
        onClick={toggleTheme}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          border: 'none'
        }}
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </header>
  );
}

export default Header;
