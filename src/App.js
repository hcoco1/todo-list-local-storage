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

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Username"
          value={newTodo.username}
          onChange={(e) => setNewTodo({ ...newTodo, username: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Process Path"
          value={newTodo.processPath}
          onChange={(e) => setNewTodo({ ...newTodo, processPath: capitalizeFirstLetter(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Durable"
          value={newTodo.durable}
          onChange={(e) => setNewTodo({ ...newTodo, durable: capitalizeFirstLetter(e.target.value) })}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
  {todos.map((todo, index) => (
    <li key={todo.id}>
      <span>{index + 1}</span> {/* Number */}
      <span>{todo.username}</span> {/* Username */}
      <span>{todo.processPath}</span> {/* Process Path */}
      <span>{todo.durable}</span> {/* Durable */}
      <span>{todo.date}</span> {/* Date */}
      
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>X</button>
    </li>
  ))}
</ul>


    </div>
  );
}

export default App;


