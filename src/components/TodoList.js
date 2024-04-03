import React, { useState } from 'react';
import './TodoList.css';
import TodoCard from './TodoCard';
import moment from 'moment';
import { MDBBtn } from 'mdb-react-ui-kit';

function TodoList({ todos, deleteTodo, toggleEdit, handleEditChange, saveEdit }) {

  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [dateSince, setDateSince] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  console.log({ dateSince, dateUntil, selectedAuditor });

  const resetFilters = () => {
    setDateSince('');
    setDateUntil('');
    setSelectedAuditor('');
  };



  const inlineStyle = { textAlign: 'center', color: 'black', fontWeight: 'bold' }


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
        <h4>Filter audits by:</h4>
      </div>
      <div className="filter-container">
        <div className="filter-item">
          <label htmlFor="date-since">From:</label>
          <input id="date-since" type="datetime-local" value={dateSince} onChange={e => setDateSince(e.target.value)} />
        </div>
        <div className="filter-item">
          <label htmlFor="date-until">To:</label>
          <input id="date-until" type="datetime-local" value={dateUntil} onChange={e => setDateUntil(e.target.value)} />
        </div>
        <div className="filter-item">
          <label htmlFor="auditor-select">Auditor:</label>
          <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
            <option value="">Audits by all auditors</option>
            <option value="ariaivan">Audits by ariaivan</option>
            <option value="yoalugol">Audits by yoalugol</option>
          </select>
          
        </div>
        <div className="filter-item">
        <MDBBtn size='sm' className='b-2' color='warning' onClick={resetFilters}>Reset</MDBBtn>
        </div>
      </div>


      <h6 style={inlineStyle}>
        <strong style={{ color: 'red', fontSize:'16px' }}>{filteredTodos.length} Audits found</strong>
        {dateSince && ` from ${moment(dateSince).format('dddd, MMMM Do YYYY, h:mm a')} `}
        {dateUntil && ` to ${moment(dateUntil).format('dddd, MMMM Do YYYY, h:mm a')} `}
        {selectedAuditor && ` by ${selectedAuditor}`}
      </h6>





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


