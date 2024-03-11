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
      id: Date.now(),
      isEditing: false
    }]);
    setNewTodo({ username: '', processPath: '', durable: '' });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isEditing: !todo.isEditing };
      }
      return todo;
    }));
  };

  const handleEditChange = (id, event) => {
    const { name, value } = event.target;
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, [name]: value };
      }
      return todo;
    }));
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isEditing: false };
      }
      return todo;
    }));
  };

  const generateReport = () => {
    const reportLines = todos.map((todo, index) =>
      `${index + 1}. Username: "${todo.username}", Process Path: "${todo.processPath}", Durable: "${todo.durable}", Date: "${todo.date}"`
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
      <main>
        <h1>Note-Taking App</h1>

        <form onSubmit={addTodo}>
  <div className="form-row"> {/* Container to hold inline elements */}
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
  </div>
  <textarea
    placeholder="Audit"
    value={newTodo.durable}
    onChange={(e) => setNewTodo({ ...newTodo, durable: e.target.value })}
    required
    rows="2" // Makes the textarea about two lines high
  ></textarea>
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
                <td>
                  {todo.isEditing ? (
                    <input
                      type="text"
                      
                      name="username"
                      className="edit-mode-input"
                      value={todo.username}
                      onChange={(e) => handleEditChange(todo.id, e)}
                    />
                  ) : (
                    todo.username
                  )}
                </td>
                <td>
                  {todo.isEditing ? (
                    <select
                      name="processPath"
                      className="edit-mode-input"
                      value={todo.processPath}
                      onChange={(e) => handleEditChange(todo.id, e)}
                    >
                      <option value="Pack">Pack</option>
                      <option value="Induct">Induct</option>
                      <option value="Rebin">Rebin</option>
                      <option value="Pack-other">Pack-other</option>
                      <option value="Smartpac">Smartpac</option>
                    </select>
                  ) : (
                    todo.processPath
                  )}
                </td>
                <td>
                  {todo.isEditing ? (
                    <input
                      type="text"
                      className="edit-mode-input"
                      name="durable"
                      value={todo.durable}
                      onChange={(e) => handleEditChange(todo.id, e)}
                    />
                  ) : (
                    todo.durable
                  )}
                </td>
                <td>{todo.date}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                  {todo.isEditing ? (
                    <button   onClick={() => saveEdit(todo.id)}>Save</button>
                  ) : (
                    <button  onClick={() => toggleEdit(todo.id)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="download-btn" onClick={generateReport}>Download Report</button>
      </main>
      <footer>
        <div className="social-media">
          <a href="https://www.hcoco1.com/" target="_blank" rel="noreferrer" className="social-icon user"><i className="fas fa-user"></i></a>
          <a href="https://www.linkedin.com/in/hcoco1" target="_blank" rel="noreferrer" className="social-icon linkedin"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com/hcoco1" target="_blank" rel="noreferrer" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
        </div>
        <p>COPYRIGHT © 2024 Ivan Arias</p>
      </footer>
    </div>
  );
}

export default App;
