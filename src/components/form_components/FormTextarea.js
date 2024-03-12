// src/components/FormTextarea.js
import React from 'react';

function FormTextarea({ name, placeholder, value, onChange, rows }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      rows={rows}
    ></textarea>
  );
}

export default FormTextarea;
