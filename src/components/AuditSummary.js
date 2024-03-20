import React from 'react';
import './AuditSummary.css';

const AuditSummary = ({ todos }) => {
  const calculateTotals = (key) => todos.reduce((acc, todo) => {
    const keyValue = todo[key];
    if (acc[keyValue]) {
      acc[keyValue] += 1;
    } else {
      acc[keyValue] = 1;
    }
    return acc;
  }, {});

  const calculateSortAndPackForAFE = (afe) => {
    return todos.filter(todo => todo.afe === afe).reduce((acc, todo) => {
      if (todo.processPath === 'Induct' || todo.processPath === 'Rebin') {
        acc.Sort = (acc.Sort || 0) + 1;
      } else if (todo.processPath === 'Pack' || todo.processPath === 'Pack-other' || todo.processPath === 'Smartpac') {
        acc.Pack = (acc.Pack || 0) + 1;
      }
      return acc;
    }, {});
  };

  const afeTotals = calculateTotals('afe');
  const processPathTotals = calculateTotals('processPath');
  const errorTotals = calculateTotals('error');

  const renderAFEWithSortAndPackTable = (data) => {
    const sortAndPackAFE1 = calculateSortAndPackForAFE('AFE1');
    const sortAndPackAFE2 = calculateSortAndPackForAFE('AFE2');

    // Calculate the total counts for AFE1 and AFE2
    const totalAFE1AndAFE2 = (data['AFE1'] || 0) + (data['AFE2'] || 0);
    const totalSort = (sortAndPackAFE1.Sort || 0) + (sortAndPackAFE2.Sort || 0);
    const totalPack = (sortAndPackAFE1.Pack || 0) + (sortAndPackAFE2.Pack || 0);

    return (
      <div>
       
        <table className="audit-summary-table">
          <thead>
            <tr>
              <th>AFE</th>
              <th>Sub total</th>
              <th>Sort</th>
              <th>Pack</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AFE1</td>
              <td>{data['AFE1'] || 0}</td>
              <td>{sortAndPackAFE1.Sort || 0}</td>
              <td>{sortAndPackAFE1.Pack || 0}</td>
            </tr>
            <tr>
              <td>AFE2</td>
              <td>{data['AFE2'] || 0}</td>
              <td>{sortAndPackAFE2.Sort || 0}</td>
              <td>{sortAndPackAFE2.Pack || 0}</td>
            </tr>
            {/* Add a row for total counts */}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{totalAFE1AndAFE2}</strong></td>
              <td><strong>{totalSort}</strong></td>
              <td><strong>{totalPack}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="audit-summary-container">
      {renderAFEWithSortAndPackTable(afeTotals)}
      {renderTable(processPathTotals, 'Process')}
      {renderTable(errorTotals, 'Error')}
    </div>
  );
};

const renderTable = (data, title) => {
  const totalCounts = Object.values(data).reduce((acc, currentValue) => acc + currentValue, 0);

  return (
    <div>
      
      <table className="audit-summary-table">
        <thead>
          <tr>
            <th>{title}</th>
            <th>Audits</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{totalCounts}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AuditSummary;
