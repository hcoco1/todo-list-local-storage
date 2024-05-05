import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './AFESummary.css'; // Make sure this is correctly linked

const CustomLegend = ({ data }) => {
  return (
    <div className="legend-container">
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.map((entry, index) => (
          <li key={index} style={{ color: entry.color, marginBottom: 1 }}>
            {entry.name}: {entry.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AFESummary = ({ filteredTodos, className }) => {
  const fieldsToCount = [
    { field: 'afe', value: 'AFE1' },
    { field: 'afe', value: 'AFE2' },
    { field: 'afe', value: 'Pack Singles' },
  ];

  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  const data = fieldsToCount.map(item => ({
    name: item.value,
    count: countNotes(item.field, item.value),
    color: ['#4E79A7',  // Bluish
      '#F28E2B',  // Orange
      '#E15759',  // Red
      '#76B7B2',  // Teal
      '#59A14F',  // Green
      '#EDC948',  // Yellow
      '#B07AA1',  // Purple
      '#FF9DA7',  // Pink
      '#9C755F',  // Brown
      '#BAB0AC'][fieldsToCount.indexOf(item) % 9]
  }));




  return (
    <>
      <h3 className={`audits-summary-title ${className}`}>
        Total audits by Process:
      </h3>
      <CustomLegend data={data} />
      <div className="audits-summary-chart">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: '12px' }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AFESummary;
