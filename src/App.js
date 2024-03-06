import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    // Use a function to lazily initialize the todos state from localStorage
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState({
    username: '',
    processPath: '',
    durable: ''
  });

  useEffect(() => {
    // Update localStorage whenever the todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const addTodo = (e) => {
    e.preventDefault();
    const currentEasternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    setTodos(prevTodos => [...prevTodos, { 
      ...newTodo, 
      processPath: capitalizeFirstLetter(newTodo.processPath),
      durable: capitalizeFirstLetter(newTodo.durable),
      date: currentEasternTime, 
      id: Date.now() 
    }]);
    setNewTodo({ username: '', processPath: '', durable: '' }); // Reset form fields
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const generateReport = () => {
    // Format todos into a string, using index for sequential numbers
    const reportLines = todos.map((todo, index) => 
      `${index + 1}, ${todo.username}, ${todo.processPath}, ${todo.durable}, ${todo.date}`
    ).join('\n');
  
    // Convert string to a Blob
    const blob = new Blob([reportLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-report.txt'; // Name of the file to be downloaded
    document.body.appendChild(link); // Append to the document
    link.click();
  
    // Clean up by removing the temporary link and revoking the Blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  return (
    <div className="App">
      <h1>Ivan's Audit</h1>
      <form onSubmit={addTodo}>
  <input
    type="text"
    placeholder="Username"
    value={newTodo.username}
    onChange={(e) => setNewTodo({ ...newTodo, username: e.target.value })}
    required
  />

  <select
    value={newTodo.processPath}
    onChange={(e) => setNewTodo({ ...newTodo, processPath: e.target.value })}
    required
  >
    <option value="">Select Process Path</option> {/* Placeholder option */}
    <option value="Pack">Pack</option>
    <option value="Induct">Induct</option>
    <option value="Rebin">Rebin</option>
    <option value="Pack-other">Pack-other</option>
    <option value="Smartpac">Smartpac</option>
    {/* Add additional options as needed */}
  </select>

  <input
    type="text"
    placeholder="Durable"
    value={newTodo.durable}
    onChange={(e) => setNewTodo({ ...newTodo, durable: capitalizeFirstLetter(e.target.value) })}
    required
  />

  <button type="submit">Add Audit</button>
</form>

      <ul>
  {todos.map((todo, index) => (
    <li key={todo.id}>
      <span className="number">{index + 1}</span> {/* Number */}
      <span className="username">{todo.username}</span> {/* Username */}
      <span>{todo.processPath}</span> {/* Process Path */}
      <span>{todo.durable}</span> {/* Durable */}
      <span>{todo.date}</span> {/* Date */}
      
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
    </li>
  ))}
</ul>

<button onClick={generateReport}>Download Report</button>
    </div>
  );
}

export default App;


