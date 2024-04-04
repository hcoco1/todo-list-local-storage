import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './PeriodSummary.css'; // Import the CSS file

const PeriodSummary = ({ filteredTodos, className }) => {
  // Define the fields and values you want to count
  const fieldsToCount = [
    { field: 'period', value: '(6:30-10:00 PM)' },
    { field: 'period', value: '(10:30 PM-02:00 AM)' },
    { field: 'period', value: '(2:30 AM-05:00 AM)' },
    { field: 'period', value: '(5:15 AM-07:00 AM)' },
    // Extend this array based on your data model and requirements
  ];

  // Function to count the occurrences of a value in a given field
  const countNotes = (field, value) => {
    return filteredTodos.filter(note => note[field] === value).length;
  };

  // Data for the bar chart
  const data = fieldsToCount.map(item => ({
    name: item.value.startsWith('(') && item.value.endsWith(')') ? item.value.slice(1, -1) : item.value,
    count: countNotes(item.field, item.value)
  }));

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00bfff', '#ff4040', '#008080', '#800080', '#008000'];

  return (

    <>
      <h4 className="audits-summary-title">Work Shift Hours</h4>
      <div className={`audits-summary-container ${className}`}>
        <div>

        </div>

        <div className="audits-summary-chart">
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: '12px' }}/>
            <YAxis />
            <Tooltip />

            <Bar dataKey="count" fill={colors[5]} />
          </BarChart>
        </div>

        {/* Display counts */}
        {/*         <div className="audits-summary-counts">
          {fieldsToCount.map(({ field, value }) => (
            <div key={`${field}-${value}`} className="audits-summary-item">
              <p>{`${value}: ${countNotes(field, value)}`}</p>
            </div>
          ))}
        </div> */}
      </div>
    </>

  );
};

export default PeriodSummary;