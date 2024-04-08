import React, { useState } from 'react';
import links from './data/linksData'; // Adjust the path as necessary
import './LinkCards.css'; // Ensure you have this CSS file

const LinkCards = () => {
  const [userInput, setUserInput] = useState({});

  // Function to handle button click for navigation in a new tab
  const navigateToUrl = (url, id) => {
    const finalUrl = id === 4 ? url.replace('{string provided by user}', userInput[id] || '') : url;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  // Function to handle user input for special links
  const handleInputChange = (e, id) => {
    setUserInput(prev => ({ ...prev, [id]: e.target.value }));
  };

  return (
    <div className="cards-container">
      {links.map(({ id, title, description, url }) => (
        <div key={id} className="card">
          <div className="card-content">
            <h5>{title}</h5>
            <p>{description}</p>
            {id === 4 ? (
              <>
                <input
                  type="text"
                  placeholder="Enter required string"
                  value={userInput[id] || ''}
                  onChange={(e) => handleInputChange(e, id)}
                  style={{marginBottom: "10px"}}
                />
                <button onClick={() => navigateToUrl(url, id)} className="btn btn-primary">
                  Visit
                </button>
              </>
            ) : (
              <button onClick={() => navigateToUrl(url, id)} className="btn btn-primary">
                Visit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkCards;













