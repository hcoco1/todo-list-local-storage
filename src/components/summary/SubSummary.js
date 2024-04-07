import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SubSummary.css'; // Import the CSS file

const SubSummary = ({ filteredTodos, className }) => {
  // Define the fields and values you want to count
  const fieldsToCount = [
    { field: 'processPath', value: 'Pack' },
    { field: 'processPath', value: 'Induct' },
    { field: 'processPath', value: 'Rebin' },
    { field: 'processPath', value: 'Pack Other' },
    { field: 'processPath', value: 'Smartpac' },
    // Extend this array based on your data model and requirements
  ];

  // Function to count the occurrences of a value in a given field
  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  // Data for the bar chart
  const data = fieldsToCount.map(item => ({
    name: item.value,
    count: countNotes(item.field, item.value)
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff5300', '#00bfff', '#ff4040', '#008080', '#800080', '#008000'];

  return (
    <>
      <h4 className="audits-summary-title">Sub Process</h4>
      <div className={`audits-summary-container ${className}`}>
        <div className="audits-summary-chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 1, left: 1, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"  tick={{ fontSize: '12px' }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={colors[6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default SubSummary;





