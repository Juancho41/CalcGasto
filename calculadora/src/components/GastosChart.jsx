import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'

const BarChart = ({ data }) => {

    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

  // Create an object to aggregate the data by categoria
  const aggregatedData = {};
  data.forEach((item) => {
    const categoria = item.categoria;
    const monto = item.monto;

    if (!aggregatedData[categoria]) {
      aggregatedData[categoria] = 0;
    }

    aggregatedData[categoria] += monto;
  });

  // Extract categories and sumMontos from the aggregated data
  const categories = Object.keys(aggregatedData);
  const sumMontos = Object.values(aggregatedData);

  // Define the chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Sum of Monto',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: sumMontos,
      },
    ],
  };

  // Define the chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div>
      <h2>Tendencias</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;

