import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import './ErrorSummary.css'; // Import the CSS file

const ErrorSummary = ({ filteredTodos, className }) => {
  // Define the fields and values you want to count
  const fieldsToCount = [
    { field: 'error', value: 'Rebin Error Indicator' },
    { field: 'error', value: 'Induct Error Indicator' },
    { field: 'error', value: 'Induct Shortage' },
    { field: 'error', value: 'Wrong Box' },
    { field: 'error', value: 'Slam Kickout' },
    { field: 'error', value: 'Pack Item Missing' },
    { field: 'error', value: 'Pack Item Damaged' },
    { field: 'error', value: 'Pack Item Unscannable' },
    { field: 'error', value: 'Shipment Exception' },
    // Extend this array based on your data model and requirements
  ];

  // Function to count the occurrences of a value in a given field
  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  // Data for the pie chart
  const data = fieldsToCount.map(item => ({
    name: item.value,
    value: countNotes(item.field, item.value) // 'value' is used by Pie chart
  }));

  const colors = [
    '#4E79A7',  // Bluish
    '#F28E2B',  // Orange
    '#E15759',  // Red
    '#76B7B2',  // Teal
    '#59A14F',  // Green
    '#EDC948',  // Yellow
    '#B07AA1',  // Purple
    '#FF9DA7',  // Pink
    '#9C755F',  // Brown
    '#BAB0AC'   // Grey
];


  // Formatter function for the legend
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value} ({entry.payload.value})</span>;
  };

  return (
    <>
      <h2 className={`audits-summary-title ${className}`}>Total audits by Errors</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={125}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend formatter={renderColorfulLegendText} align="left" verticalAlign="top" layout="vertical" wrapperStyle={{ fontSize: '14px' }} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ErrorSummary;
