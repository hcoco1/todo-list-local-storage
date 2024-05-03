import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TodoList.css';
import TodoCard from './TodoCard';
import { MDBBtn } from 'mdb-react-ui-kit';
import Pagination from '../Pagination';
import { debounce } from 'lodash';

function TodoList({ todos, deleteTodo, currentUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Read parameters from URL using URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  const [dateSince, setDateSince] = useState(searchParams.get('dateSince') || '');
  const [dateUntil, setDateUntil] = useState(searchParams.get('dateUntil') || '');
  const [selectedUsername, setSelectedUsername] = useState(searchParams.get('selectedUsername') || '');

  // Debounce function to handle username filter updates
  const debouncedSetUsername = debounce((value) => {
    setSelectedUsername(value);
  }, 300);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  // Filter and sort todos based on criteria
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

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Effect to update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (dateSince) params.set('dateSince', dateSince);
    if (dateUntil) params.set('dateUntil', dateUntil);
    if (selectedUsername) params.set('selectedUsername', selectedUsername);
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [dateSince, dateUntil, selectedUsername, navigate, location.pathname]);

  // Reset filters and clear URL parameters
  const resetFilters = () => {
    setDateSince('');
    setDateUntil('');
    setSelectedUsername('');
    navigate(location.pathname); // Navigate without search parameters
  };

  return (
    <>
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
                onChange={e => debouncedSetUsername(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <MDBBtn size='sm' color='warning' onClick={resetFilters}>Reset</MDBBtn>
            </div>
          </div>
        </div>
        <h3>Total Audits: <strong>{filteredTodos.length}</strong></h3>
        {currentTodos.map((todo, index) => (
          <TodoCard key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default TodoList;
