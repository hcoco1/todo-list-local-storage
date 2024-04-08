import React, { useState } from 'react';
import './TodoList.css';
import TodoCard from './TodoCard';
import moment from 'moment';
import { MDBBtn } from 'mdb-react-ui-kit';

function TodoList({ todos, deleteTodo, currentUser  }) {

/*   const [selectedAuditor, setSelectedAuditor] = useState(''); */
  const [dateSince, setDateSince] = useState('');
  const [dateUntil, setDateUntil] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');


  const resetFilters = () => {
    setDateSince('');
    setDateUntil('');
    setSelectedUsername('');
  };



  const inlineStyle = { textAlign: 'center', color: 'black', fontWeight: 'bold', marginBottom: '20px', fontSize: '20px' }


  const filteredTodos = todos.filter(todo => {
    const matchesAuditor = todo.auditor === currentUser.displayName;
    // Update the matchesUsername to check for a partial match using .includes()
    const matchesUsername = selectedUsername ? todo.username.toLowerCase().includes(selectedUsername.toLowerCase()) : true;
    const todoDate = new Date(todo.createdAt);
    const sinceDate = dateSince ? new Date(dateSince) : null;
    const untilDate = dateUntil ? new Date(dateUntil) : null;
    const matchesSince = sinceDate ? todoDate >= sinceDate : true;
    const matchesUntil = untilDate ? todoDate <= untilDate : true;
  
    return matchesAuditor && matchesUsername && matchesSince && matchesUntil;
}).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  

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




          <div className="filter-item">
            <MDBBtn size='sm' color='warning' onClick={resetFilters}>Reset</MDBBtn>
          </div>
        </div>



      </div>



      <h6 style={inlineStyle}>
        <strong style={{ color: 'red', }}>Total Audits found: {filteredTodos.length} </strong>
        {dateSince && ` from ${moment(dateSince).format('dddd, MMMM Do YYYY, h:mm a')} `}
        {dateUntil && ` to ${moment(dateUntil).format('dddd, MMMM Do YYYY, h:mm a')} `}
       {/*  {selectedAuditor && ` by ${selectedAuditor}`} */}
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


