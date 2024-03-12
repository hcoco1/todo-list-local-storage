import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm'; 
import TodoList from './components/TodoList'; 
import Footer from './components/Footer';
import ReportGenerator from './components/ReportGenerator';
import AuditorNameForm from './components/AuditorNameForm';

function App() {
  // State for storing todos
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // State for handling the new todo input
  const [newTodo, setNewTodo] = useState({
    username: '',
    processPath: '',
    durable: ''
  });

  const [auditorName, setAuditorName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false); // New state to control the editing state

  const handleNameSubmit = (name) => {
    setAuditorName(name);
    setIsEditingName(false); // Hide form after submission
  };

  // Effect for persisting todos in localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    setTodos(prevTodos => [...prevTodos, {
      ...newTodo,
      date: currentEasternTime,
      id: Date.now(),
      isEditing: false
    }]);
    setNewTodo({ username: '', processPath: '', durable: '' });
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Function to toggle edit mode for a todo
  const toggleEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  // Function to handle change on edit inputs
  const handleEditChange = (id, event) => {
    const { name, value } = event.target;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, [name]: value } : todo));
  };

  // Function to save the edits made to a todo
  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: false } : todo));
  };

  return (
    <div className="App">
      <main>
        <h1>Note-Taking App 🪄</h1>
        {auditorName && !isEditingName ? (
      <div className="auditor-display">
        <h2>Auditor's Name: {auditorName}</h2>
        <button 
          onClick={() => setIsEditingName(true)} 
          className="edit-name-button">
          Edit
        </button>
      </div>
    ) : (
      <AuditorNameForm onNameSubmit={handleNameSubmit} />
    )}
      
        <TodoForm addTodo={addTodo} newTodo={newTodo} setNewTodo={setNewTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleEdit={toggleEdit}
          handleEditChange={handleEditChange}
          saveEdit={saveEdit}
        />
         <ReportGenerator todos={todos} />
      </main>
      <Footer />
    </div>
  );
}

export default App;


