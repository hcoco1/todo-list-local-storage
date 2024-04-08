import React from 'react';
import '../App.css';
import {  MDBBtn} from 'mdb-react-ui-kit';

const ReportGenerator = ({ todos }) => {
  const generateReport = () => {
    // Generating report content with all specified fields
    const reportContent = todos.map((todo, index) =>
      `${index + 1}. Associate: ${todo.username}, Process: ${todo.afe}, Sub Process: ${todo.processPath}, Error: ${todo.error}, General Coaching: ${todo.coaching} Observations: ${todo.durable}, Date: ${todo.createdAt}`
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
    <MDBBtn size='sm' color='primary'onClick={generateReport}>Download Report</MDBBtn>
  );
};

export default ReportGenerator;
