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
    // Generate report lines with the new format
    const reportLines = todos.map((todo, index) =>
      `${index + 1}. Username: "${todo.username}", Process Path: "${todo.processPath}", Durable: "${todo.durable}", Date: "${todo.date}"`
    ).join('\n');

    // Create a blob with the report content
    const blob = new Blob([reportLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-report.txt'; // Extension changed to .txt to reflect the plain text format
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  return (


    <div className="App">

      <main>
      <h1>Note-Taking App</h1>

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
            placeholder="Audit"
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
      </main>
      <footer>
        
        <div class="social-media">
          <a href="https://www.hcoco1.com/" target="_blank" rel="noreferrer" class="social-icon user"><i class="fas fa-user"></i></a>
          <a href="https://www.linkedin.com/in/hcoco1" target="_blank" rel="noreferrer" class="social-icon linkedin"><i class="fab fa-linkedin"></i></a>
          <a href="https://twitter.com/hcoco1" target="_blank" rel="noreferrer" class="social-icon twitter"><i class="fab fa-twitter"></i></a>
       
        </div>
        <p>COPYRIGHT © 2024 Ivan Arias</p>

      </footer>





    </div>


  );
}

export default App;
