import React from 'react';
import ChartComponent from './ChartComponent'; // Adjust the import path as necessary
import TableComponent from './TableComponent'; // Adjust the import path as necessary
import './AuditSummary.css'; // Styling for the app
import Greeting from './Greeting';

const calculateTotalsWithPeriods = (todos, key) => {
    return todos.reduce((acc, todo) => {
        const keyValue = todo[key];
        if (!acc[keyValue]) {
            acc[keyValue] = { total: 0, period1: 0, period2: 0, period3: 0, period4: 0 };
        }
        acc[keyValue].total += 1;
        acc[keyValue][`period${todo.period}`] += 1;
        return acc;
    }, {});
};

const AuditSummary = ({ todos }) => {
    const afeTotals = calculateTotalsWithPeriods(todos, 'afe');
    const processPathTotals = calculateTotalsWithPeriods(todos, 'processPath');
    const errorTotals = calculateTotalsWithPeriods(todos, 'error');
    const periodTotals = calculateTotalsWithPeriods(todos, 'period');

    // Chart Data and Options for AFE
    const afeChartData = {
        labels: Object.keys(afeTotals),
        datasets: [{
            label: 'Total Audits by AFE',
            data: Object.values(afeTotals).map(entry => entry.total),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    // Repeat for Process Path and Error
    const processPathChartData = {
        labels: Object.keys(processPathTotals),
        datasets: [{
            label: 'Total Audits by Process Path',
            data: Object.values(processPathTotals).map(entry => entry.total),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }],
    };

    const errorChartData = {
        labels: Object.keys(errorTotals),
        datasets: [{
            label: 'Total Audits by Error',
            data: Object.values(errorTotals).map(entry => entry.total),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        }],
    };
    const periodLabels = {
        '1': '6:30-10:00',
        '2': '10:30-02:00',
        '3': '2:30-05:00',
        '4': '5:15-07:00',
      };
      
      const periodChartData = {
        labels: Object.keys(periodTotals).map(period => periodLabels[period] || period),
        datasets: [{
            label: 'Total Audits by Period',
            data: Object.values(periodTotals).map(entry => entry.total),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        }],
    };
    

    // Common Chart Options
    const chartOptions = {
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        },
        scales: {
            y: {
                grid: {
                    display: false // Hide the vertical grid lines
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0 // Display only integer values on the y-axis
                }
            },
            x: {
                grid: {
                    display: false // Hide the vertical grid lines
                }
            }
        },
        elements: {
            bar: {
                backgroundColor: 'rgba(154, 162, 235, 0.1)', // Set the background color of the bars
                borderColor: 'rgba(54, 162, 235, 1)', // Set the border color of the bars
                borderWidth: 3 // Adjust the width of the bars as needed
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        }
    };

    const chartData = {
        Periods: periodChartData,
        AFE: afeChartData,
        ProcessPath: processPathChartData,
        Error: errorChartData,
    };

    const tableData = {
        Periods: periodTotals,
        AFE: afeTotals,
        ProcessPath: processPathTotals,
        Error: errorTotals,
    };

    return (
        <div className="audit-summary-container">
           <Greeting todos={todos}/>
          {Object.keys(chartData).map((key, index) => (
            index % 2 === 0 && (
              <div className="row" key={key}>
                <div className="chart-container">
                  <ChartComponent chartData={chartData[key]} chartOptions={chartOptions} />
                </div>
{/*                 <div className="table-container">
                  <TableComponent data={tableData[key]} title={`${key} Totals`} />
                </div> */}
                {Object.keys(chartData)[index + 1] && (
                  <div className="chart-container">
                    <ChartComponent chartData={chartData[Object.keys(chartData)[index + 1]]} chartOptions={chartOptions} />
                  </div>
                )}
{/*                 {Object.keys(tableData)[index + 1] && (
                  <div className="table-container">
                    <TableComponent data={tableData[Object.keys(tableData)[index + 1]]} title={`${Object.keys(chartData)[index + 1]} Totals`} />
                  </div>
                )} */}
              </div>
            )
          ))}
        </div>
      );
      
};

export default AuditSummary;
