import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState({
    username: '',
    processPath: '',
    durable: ''
  });

  useEffect(() => {
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
    setNewTodo({ username: '', processPath: '', durable: '' });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const generateReport = () => {
    const reportLines = todos.map((todo, index) => 
      `${index + 1}, ${todo.username}, ${todo.processPath}, ${todo.durable}, ${todo.date}`
    ).join('\n');
  
    const blob = new Blob([reportLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-report.txt';
    document.body.appendChild(link);
    link.click();
  
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
          <option value="">Process Path</option>
          <option value="Pack">Pack</option>
          <option value="Induct">Induct</option>
          <option value="Rebin">Rebin</option>
          <option value="Pack-other">Pack-other</option>
          <option value="Smartpac">Smartpac</option>
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

      <table>
        <thead>
          <tr>
            <th>N</th>
            <th>AA</th>
            <th>Process</th>
            <th>Durable</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.username}</td>
              <td>{todo.processPath}</td>
              <td>{todo.durable}</td>
              <td>{todo.date}</td>
              <td><button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generateReport}>Download Report</button>
    </div>
  );
}

export default App;
