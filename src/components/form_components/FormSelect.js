// src/components/FormSelect.js
import React from 'react';

function FormSelect({ name, value, onChange, options }) {
  return (
    <select name={name} value={value} onChange={onChange} required>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FormSelect;
