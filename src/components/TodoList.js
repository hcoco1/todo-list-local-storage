import React, { useMemo, useState } from 'react';
import './TodoList.css';

function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {
  const [filterInput, setFilterInput] = useState("");

  const filteredTodos = useMemo(() => todos.filter(todo =>
    todo.username.toLowerCase().includes(filterInput.toLowerCase()) ||
    (todo.auditor && todo.auditor.toLowerCase().includes(filterInput.toLowerCase()))
  ), [todos, filterInput]);

  function formatTimestampToUTC(timestamp) {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', timestamp);
      return 'Invalid Date'; // Or handle this case as needed
    }

    try {
      return date.toLocaleString('en-US', { timeZone: 'America/New_York' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return date.toUTCString(); // Fallback to UTC
    }
  }

  const copyTextOnClick = (coaching, observations) => {
    const combinedText = `${coaching}\nObservations: ${observations}`;
    navigator.clipboard.writeText(combinedText)
      .then(() => console.log('Text copied!'))
      .catch(err => console.error('Error copying text: ', err));
  };

  const copyAssociateText = (associate) => {
    navigator.clipboard.writeText(associate)
      .then(() => console.log('Associate copied!'))
      .catch(err => console.error('Error copying text: ', err));
  };

  // Split filteredTodos into chunks for the layout
  const rows = [];
  for (let i = 0; i < filteredTodos.length; i += 4) {
    rows.push(filteredTodos.slice(i, i + 4));
  }

  return (
    <div className="NotesContainer">
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder={"Search by AA or Auditor"}
      />
      {rows.map((row, rowIndex) => (
        <ul key={rowIndex}>
          {row.map((todo, index) => (
            <li key={todo.id} className="NoteCardContent">
              <div className="info-group">
                <p className="NoteText"><strong>N:</strong> <strong><span style={{ color: 'red' }}>{index + 1 + rowIndex * 4}</span></strong></p>
                <strong>Created at:</strong> {formatTimestampToUTC(todo.createdAt)}
                <p className="NoteText"><strong>Auditor:</strong> {todo.auditor}</p>
                <p className="NoteText"><strong>Period:</strong> {todo.period}</p>
              </div>
              <div className="info-group">
                <p className="NoteText" onClick={() => copyAssociateText(todo.username)}>
                  <strong>Associate:</strong>{todo.username}
                </p>
                <p className="NoteText"><strong>AFE:</strong> {todo.afe}</p>
                <p className="NoteText"><strong>Process:</strong> {todo.processPath}</p>
                <p className="NoteText"><strong>Error:</strong> {todo.error}</p>
              </div>
              <div>
                {/* Clickable General Coaching text */}
                <p className="NoteText" onClick={() => copyTextOnClick(todo.coaching, todo.durable)}>
                  <strong>General Coaching:</strong>{todo.coaching}
                </p>
              </div>
              <div>
                {/* Clickable Observations text */}
                <p className="NoteText" onClick={() => copyTextOnClick(todo.coaching, todo.durable)}>
                  <strong>Observations:</strong>{todo.durable}
                </p>
              </div>
              <div className="header">

                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}><strong>Delete Audit N:</strong> {index + 1 + rowIndex * 4}</button>
              </div>

            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default TodoList;



