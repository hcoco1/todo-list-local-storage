// Importing necessary React hooks and CSS for styling
import React, { useState, useEffect } from 'react';
import './App.css'; // Styling for the app

// Importing child components used within the App component
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import ReportGenerator from './components/ReportGenerator';
import AuditorNameForm from './components/AuditorNameForm';

function App() {
  // Initializes 'todos' state with data from localStorage or as an empty array if none is found.
  // This is used to persist todo items between sessions.
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // State for handling inputs for a new todo. Default values are empty.
  const [newTodo, setNewTodo] = useState({
    username: '',
    afe: '',
    processPath: '',
    error: '',
    durable: ''
  });

  // State for storing and handling the auditor's name, with initial value from localStorage if available.
  const [auditorName, setAuditorName] = useState(() => {
    const storedName = localStorage.getItem('auditorName');
    return storedName || '';
  });

  // State to control the visibility of the auditor name editing form.
  const [isEditingName, setIsEditingName] = useState(false);

  // Handles submission of a new auditor name, updates state, and hides the form.
  const handleNameSubmit = (name) => {
    setAuditorName(name);
    setIsEditingName(false);
  };

  // Effect hook to persist auditor name in localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem('auditorName', auditorName);
  }, [auditorName]);

  // Effect hook to persist todos in localStorage whenever the 'todos' state changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Adds a new todo item to the list with current date and unique ID.
  const addTodo = (e) => {
    e.preventDefault();
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    setTodos(prevTodos => [...prevTodos, {
      ...newTodo,
      date: currentEasternTime,
      id: Date.now(),
      isEditing: false
    }]);
    setNewTodo({
      username: '',
      afe: '',
      processPath: '',
      error: '',
      durable: ''
    });
  };

  // Removes a todo item based on its id.
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggles the edit mode for a todo item by updating its 'isEditing' state.
  const toggleEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  // Handles changes in the todo edit form inputs, updating the corresponding todo item.
  const handleEditChange = (id, event) => {
    const { name, value } = event.target;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, [name]: value } : todo));
  };

  // Finalizes editing of a todo item, setting its 'isEditing' state to false.
  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: false } : todo));
  };

  // Render method for the App component, which includes UI for auditor name, todo form, todo list, and report generation.
  return (
    <div className="App">
      <main>
        <div className="orientation-message">
          For the best experience, please rotate your device to landscape mode.
        </div>

        <h1>Note-Taking App 🪄</h1>
        {auditorName && !isEditingName ? (
          <div className="auditor-display">
            <h2>Auditor's Name: {auditorName}</h2>
            <button onClick={() => setIsEditingName(true)} className="edit-name-button">Edit</button>
          </div>
        ) : (
          <AuditorNameForm onNameSubmit={handleNameSubmit} />
        )}

        <TodoForm addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} toggleEdit={toggleEdit} handleEditChange={handleEditChange} saveEdit={saveEdit} />
        <ReportGenerator todos={todos} />
      </main>
      <Footer />
    </div>
  );
}

export default App;



