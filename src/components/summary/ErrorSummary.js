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

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00bfff', '#ff4040', '#008080', '#800080', '#008000'];

  return (
    <>
      <h2 className="audits-summary-title">Errors</h2>
    
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
            <Legend align="left" verticalAlign="top" layout="vertical"  wrapperStyle={{ fontSize: '12px' }}  />
          </PieChart>
        </ResponsiveContainer>
  
    </>
  );
};

export default ErrorSummary;
