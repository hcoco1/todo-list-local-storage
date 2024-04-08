// Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Prev
      </button>

      {pageNumbers.map(number => (
        <button 
          key={number} 
          className={`page-item ${currentPage === number ? 'active' : ''}`} 
          onClick={() => handleSetPage(number)}
        >
          {number}
        </button>
      ))}

      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;