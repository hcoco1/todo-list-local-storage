import React, { useState } from 'react';
import './TodoList.css';
import TodoCard from './TodoCard';

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

  return (
    <div className="NotesContainer">

      <div>
        <h4>Click on the icon to filter audits by date (From - To), time and auditor name.</h4>
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
            <option value="">Audits by all auditors</option>
            <option value="ariaivan">Audits by ariaivan</option>
            <option value="yoalugol">Audits by yoalugol</option>
            <option value="Guest">Audits by Guest</option>
          </select>
        </div>
        <h4>Filtered Audits: {filteredTodos.length}</h4>
      </div>


      {filteredTodos.map((todo, index) => (
        <TodoCard key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
        />
      ))}


    </div>
  );
}

export default TodoList;


