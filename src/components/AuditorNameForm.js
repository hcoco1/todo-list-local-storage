import React, { useState } from 'react';

function AuditorNameForm({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    onNameSubmit(name); // Call the passed in onNameSubmit function with the current name
    setName(''); // Optionally reset the name to empty string
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="auditorName">Auditor's Name:</label>
      <input
        id="auditorName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Set Name</button>
    </form>
  );
}

export default AuditorNameForm;

