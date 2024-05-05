import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './PeriodSummary.css'; // Ensure this is linked correctly

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

const PeriodSummary = ({ filteredTodos, className }) => {
  const fieldsToCount = [
    { field: 'period', value: '(6:30-10:00 PM)' },
    { field: 'period', value: '(10:30 PM-02:00 AM)' },
    { field: 'period', value: '(2:30 AM-05:00 AM)' },
    { field: 'period', value: '(5:15 AM-07:00 AM)' },
  ];

  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  // Define a list of colors to apply to each bar
  const colors = [
   
    '#F28E2B',  // Orange
    '#E15759',  // Red
 
    '#59A14F',  // Green
    '#EDC948',  // Yellow
    '#B07AA1',  // Purple
    '#FF9DA7',  // Pink
    '#9C755F',  // Brown
    '#BAB0AC'   // Grey
];


  


  const data = fieldsToCount.map((item, index) => ({
    name: item.value.startsWith('(') && item.value.endsWith(')') ? item.value.slice(1, -1) : item.value,
    count: countNotes(item.field, item.value),
    color: colors[index % colors.length]  // Ensure there is a color for each bar
  }));

  return (
    <>
      <h4 className={`audits-summary-title ${className}`}>Total audits by Work Shift Hours</h4>
      <CustomLegend data={data} />
      <div className="period-summary-chart">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 1, left: 1, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: '11px' }} />
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

export default PeriodSummary;
