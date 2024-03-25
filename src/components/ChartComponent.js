import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ chartData, chartOptions }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const newChartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });
            return () => newChartInstance.destroy();
        }
    }, [chartData, chartOptions]);

    return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
