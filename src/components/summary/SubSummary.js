import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './SubSummary.css'; // Ensure this CSS is correctly linked

const CustomLegend = ({ data }) => {
  return (
    <div className="legend-container">
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {data.map((entry, index) => (
          <li key={index} style={{ color: entry.color, marginBottom: 4 }}>
            {entry.name}: {entry.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SubSummary = ({ filteredTodos, className }) => {
  const fieldsToCount = [
    { field: 'processPath', value: 'Pack' },
    { field: 'processPath', value: 'Induct' },
    { field: 'processPath', value: 'Rebin' },
    { field: 'processPath', value: 'Pack Other' },
    { field: 'processPath', value: 'Smartpac' },
  ];

  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  const colors = ['#8884d8',  '#ffc658', '#ff5300', '#ff4040', '#9C755F', '#800080', '#008000'];

  // Only include items with a count greater than 0
  const data = fieldsToCount.map((item, index) => ({
    name: item.value,
    count: countNotes(item.field, item.value),
    color: colors[index % colors.length]
  })).filter(item => item.count > 0);  // Filter out any items with a count of 0

  return (
    <>
      <h4 className={`audits-summary-title ${className}`}>Total Audits by Sub Process</h4>
      <CustomLegend data={data} />
      <div className="sub-summary-chart">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: '12px' }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
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

export default SubSummary;
