import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PeriodSummary from './PeriodSummary';
import AFESummary from './AFESummary';
import ErrorSummary from './ErrorSummary';
import { MDBBtn } from 'mdb-react-ui-kit';
import SubSummary from './SubSummary';
import './AuditSummary.css'


function AuditSummary({ todos, currentUser }) {
    const location = useLocation();
    const navigate = useNavigate();
  
    // Initialize state from local storage or set defaults
    const [dateSince, setDateSince] = useState(() => localStorage.getItem('dateSince') || '');
    const [dateUntil, setDateUntil] = useState(() => localStorage.getItem('dateUntil') || '');
    const [selectedUsername, setSelectedUsername] = useState(() => localStorage.getItem('selectedUsername') || '');

  // Effect for handling local storage and URL synchronization
  useEffect(() => {
    // Function to update local storage
    const updateLocalStorage = () => {
      localStorage.setItem('dateSince', dateSince);
      localStorage.setItem('dateUntil', dateUntil);
      localStorage.setItem('selectedUsername', selectedUsername);
    };

    // Function to update URL parameters
    const updateUrlParams = () => {
      const params = new URLSearchParams();
      if (dateSince) params.set('dateSince', dateSince);
      if (dateUntil) params.set('dateUntil', dateUntil);
      if (selectedUsername) params.set('selectedUsername', selectedUsername);
      navigate({
        pathname: location.pathname,
        search: params.toString()
      }, { replace: true });
    };

    updateLocalStorage();
    updateUrlParams();
  }, [dateSince, dateUntil, selectedUsername, navigate, location.pathname]);

  // Calculate filtered todos
  const filteredTodos = todos.filter(todo => {
    const matchesAuditor = todo.auditor === currentUser.displayName;
    const matchesUsername = selectedUsername ? todo.username.toLowerCase().includes(selectedUsername.toLowerCase()) : true;
    const todoDate = new Date(todo.createdAt);
    const sinceDate = dateSince ? new Date(dateSince) : null;
    const untilDate = dateUntil ? new Date(dateUntil) : null;
    const matchesSince = sinceDate ? todoDate >= sinceDate : true;
    const matchesUntil = untilDate ? todoDate <= untilDate : true;

    return matchesAuditor && matchesUsername && matchesSince && matchesUntil;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));




  // Reset filters and clear local storage
  const resetFilters = () => {
    setDateSince('');
    setDateUntil('');
    setSelectedUsername('');
    localStorage.removeItem('dateSince');
    localStorage.removeItem('dateUntil');
    localStorage.removeItem('selectedUsername');
    navigate(location.pathname); // Navigate without search parameters
  };



    return (
        <div className="NotesContainer">
        <div className="auditsFilter">
          <h6>Filter audits by:</h6>
          <div className="filter-container">
            <div className="filter-item">
              <label htmlFor="date-since">From:</label>
              <input
                id="date-since"
                type="datetime-local"
                value={dateSince}
                onChange={e => setDateSince(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="date-until">To:</label>
              <input
                id="date-until"
                type="datetime-local"
                value={dateUntil}
                onChange={e => setDateUntil(e.target.value)}
              />
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
        <h3>Total Audits: <strong>{filteredTodos.length}</strong></h3>



            <div className="notesContainer">
                <div className="chartComponent"><ErrorSummary filteredTodos={filteredTodos} /></div>
                <div className="chartComponent"><PeriodSummary filteredTodos={filteredTodos} /></div>
                <div className="chartComponent"><AFESummary filteredTodos={filteredTodos} /></div>
                <div className="chartComponent"><SubSummary filteredTodos={filteredTodos} /></div>
            </div>


        </div>

    )
}

export default AuditSummary
