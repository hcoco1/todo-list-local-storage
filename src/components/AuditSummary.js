// src/components/AuditSummary.js
import React from 'react';
import './AuditSummary.css';

const AuditSummary = ({ todos }) => {
  const processTotals = todos.reduce((acc, todo) => {
    const { processPath } = todo;
    if (acc[processPath]) {
      acc[processPath] += 1;
    } else {
      acc[processPath] = 1;
    }
    return acc;
  }, {});

  // Calculate the total number of audits
  const totalAudits = Object.values(processTotals).reduce((acc, currentValue) => acc + currentValue, 0);

  return (
    <div className="audit-summary-container">
      <h3>Process Summary</h3>
      <table className="audit-summary">
        <thead>
          <tr>
            <th>Process Path</th>
            <th>Total Audits</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(processTotals).map(([process, total]) => (
            <tr key={process}>
              <td>{process}</td>
              <td>{total}</td>
            </tr>
          ))}
          {/* Add a row for the total audits */}
          <tr>
            <td><strong>Total Audits</strong></td>
            <td><strong>{totalAudits}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AuditSummary;

