import React, { useState } from 'react';
import './TodoList.css';
import TodoCard from './TodoCard';
import moment from 'moment';
import { MDBBtn } from 'mdb-react-ui-kit';

function TodoList({ todos, deleteTodo, currentUser  }) {

  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [dateSince, setDateSince] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  console.log({ dateSince, dateUntil, selectedAuditor });

  const resetFilters = () => {
    setDateSince('');
    setDateUntil('');
    setSelectedUsername('');
  };



  const inlineStyle = { textAlign: 'center', color: 'black', fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }


  const filteredTodos = todos.filter(todo => {
    // This line ensures we're only looking at todos where the auditor matches the current user
    const matchesAuditor = todo.auditor === currentUser.displayName;
  
    const matchesUsername = selectedUsername ? todo.username === selectedUsername : true;
    const todoDate = new Date(todo.createdAt);
    const sinceDate = dateSince ? new Date(dateSince) : null;
    const untilDate = dateUntil ? new Date(dateUntil) : null;
    const matchesSince = sinceDate ? todoDate >= sinceDate : true;
    const matchesUntil = untilDate ? todoDate <= untilDate : true;
  
    // Now, the return statement includes the matchesAuditor condition as well
    return matchesAuditor && matchesUsername && matchesSince && matchesUntil;
  });
  

  return (
    <div className="NotesContainer">

      <div className="auditsFilter">

        <div>
          <h6>Filter audits by:</h6>
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
        <label htmlFor="username-select">Associate:</label>
        <input
          id="username-select"
          type="text"
          value={selectedUsername}
          onChange={e => setSelectedUsername(e.target.value)}
        />

      </div>



{/*           <div className="filter-item">
            <label htmlFor="auditor-select">Auditor:</label>
            <select id="auditor-select" value={selectedAuditor} onChange={e => setSelectedAuditor(e.target.value)}>
              <option value="">Audits by all auditors</option>
              <option value="ariaivan">Audits by ariaivan</option>
              <option value="yoalugol">Audits by yoalugol</option>
            </select>

          </div> */}
          <div className="filter-item">
            <MDBBtn size='sm' color='warning' onClick={resetFilters}>Reset</MDBBtn>
          </div>
        </div>



      </div>



      <h6 style={inlineStyle}>
        <strong style={{ color: 'red', }}>Total Audits found: {filteredTodos.length} </strong>
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


