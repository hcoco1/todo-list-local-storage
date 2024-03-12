import React from 'react';
import '../App.css';

const ReportGenerator = ({ todos }) => {
  const generateReport = () => {
    const reportContent = todos.map((todo, index) =>
      `${index + 1}. Username: ${todo.username}, Process Path: ${todo.processPath}, Durable: ${todo.durable}, Date: ${todo.date}`
    ).join('\n');

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const reportUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = 'todo-report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(reportUrl);
  };

  return (
    <button className='download-btn' onClick={generateReport}>Download Report</button>
  );
};

export default ReportGenerator;
