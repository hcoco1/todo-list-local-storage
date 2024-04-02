import React, {useState } from 'react';
import './TodoList.css';

function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {

  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [dateSince, setDateSince] = useState('');
  const [dateUntil, setDateUntil] = useState('');



  const filteredTodos = todos.filter(todo => {
    const matchesAuditor = selectedAuditor ? todo.auditor === selectedAuditor : true;

    // Convert string dates to Date objects for comparison
    const todoDate = new Date(todo.createdAt);
    const sinceDate = dateSince ? new Date(dateSince) : null;
    const untilDate = dateUntil ? new Date(dateUntil) : null;

    // Check if the todo's date is within the "since" and "until" range
    const matchesSince = sinceDate ? todoDate >= sinceDate : true;
    const matchesUntil = untilDate ? todoDate <= untilDate : true;

    return matchesAuditor && matchesSince && matchesUntil;
  });



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

      <div>
        <h3>Filter your audits by date, time and auditor name.</h3>
      </div>
      <div className="filter-container">
        <div className="filter-item">
          <input id="date-since" type="datetime-local" value={dateSince} onChange={e => setDateSince(e.target.value)} />
        </div>
        <div className="filter-item">
          <input id="date-until" type="datetime-local" value={dateUntil} onChange={e => setDateUntil(e.target.value)} />
        </div>
        <div className="filter-item">
          <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
            <option value="">All Auditors</option>
            <option value="Ivan">Ivan</option>
            <option value="Yoanli">Yoanli</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
        <h4>Filtered Audits: {filteredTodos.length}</h4>
      </div>




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



