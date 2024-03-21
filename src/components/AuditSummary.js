import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './AuditSummary.css';

const AuditSummary = ({ todos }) => {
  const calculateTotals = (key) => todos.reduce((acc, todo) => {
    const keyValue = todo[key];
    if (acc[keyValue]) {
      acc[keyValue].total += 1;
    } else {
      acc[keyValue] = { total: 1, sort: 0, pack: 0 };
    }
    if (todo.processPath === 'Induct' || todo.processPath === 'Rebin') {
      acc[keyValue].sort += 1;
    } else if (todo.processPath === 'Pack' || todo.processPath === 'Pack-other' || todo.processPath === 'Smartpac') {
      acc[keyValue].pack += 1;
    }
    return acc;
  }, {});

  const afeTotals = calculateTotals('afe');
  const processPathTotals = calculateTotals('processPath');
  const errorTotals = calculateTotals('error');

  const afeChartRef = useRef(null);
  const processPathChartRef = useRef(null);
  const errorTypeChartRef = useRef(null);
  const afeChartInstanceRef = useRef(null);
  const processPathChartInstanceRef = useRef(null);
  const errorTypeChartInstanceRef = useRef(null);

  useEffect(() => {
    const renderChart = (chartRef, chartData, chartOptions) => {
      const context = chartRef.current.getContext('2d');
      return new Chart(context, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    };

    const renderAFEChart = () => {
      if (afeChartInstanceRef.current) {
        afeChartInstanceRef.current.destroy();
      }

      const chartData = {
        labels: Object.keys(afeTotals),
        datasets: [{
          label: 'Total Audits',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: Object.values(afeTotals).map(entry => entry.total)
        }]
      };

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





      afeChartInstanceRef.current = renderChart(afeChartRef, chartData, chartOptions);
    };

    const renderProcessPathChart = () => {
      if (processPathChartInstanceRef.current) {
        processPathChartInstanceRef.current.destroy();
      }

      const chartData = {
        labels: Object.keys(processPathTotals),
        datasets: [{

          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: Object.values(processPathTotals).map(entry => entry.total)
        }]
      };

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
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Set the background color of the bars
            borderColor: 'rgba(54, 162, 235, 1)', // Set the border color of the bars
            borderWidth: 2 // Adjust the width of the bars as needed
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




      processPathChartInstanceRef.current = renderChart(processPathChartRef, chartData, chartOptions);
    };

    const renderErrorTypeChart = () => {
      if (errorTypeChartInstanceRef.current) {
        errorTypeChartInstanceRef.current.destroy();
      }

      const chartData = {
        labels: Object.keys(errorTotals),
        datasets: [{
          
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          data: Object.values(errorTotals).map(entry => entry.total)
        }]
      };

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
            backgroundColor: 'rgba(54, 162, 235, 0.8)', // Set the background color of the bars
            borderColor: 'rgba(54, 162, 235, 1)', // Set the border color of the bars
            borderWidth: 2 // Adjust the width of the bars as needed
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





      errorTypeChartInstanceRef.current = renderChart(errorTypeChartRef, chartData, chartOptions);
    };

    renderAFEChart();
    renderProcessPathChart();
    renderErrorTypeChart();
  }, [afeTotals, processPathTotals, errorTotals]);

  const renderTable = (data, title) => {
    return (
      <div>
      
        <table className="audit-summary-table">
          <thead>
            <tr>
              <th>{title}</th>
              <th>Audits</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  return (
<div className="audit-summary-container">
  <div className="charts-container">
    <div className="chart">
      <canvas ref={afeChartRef}></canvas>
    </div>
    <div className="chart">
      <canvas ref={processPathChartRef}></canvas>
    </div>
    <div className="chart">
      <canvas ref={errorTypeChartRef}></canvas>
    </div>
  </div>
  <div className="tables-container">
    <div>
      
      {renderTable(afeTotals, 'AFE')}
    </div>
    <div>
      {renderTable(processPathTotals, 'Process Path')}
    </div>
    <div>
      {renderTable(errorTotals, 'Error')}
    </div>
  </div>
</div>




  
  );
  
  
  
  
  
};

export default AuditSummary;
