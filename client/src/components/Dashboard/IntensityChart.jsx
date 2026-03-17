import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';

const IntensityChart = ({ data }) => {
  const intensityData = data.map(item => item.intensity);
  const years = data.map(item => item.start_year);

  const getColor = (value) => {
    const colors = ['#7F00FF', '#F2B93B', '#FF8000', '#FF453A']; // Fixed Yellow Hex Code
    const threshold = Math.max(...intensityData) / 4;
    if (value < threshold) return colors[0];
    if (value < threshold * 2) return colors[1];
    if (value < threshold * 3) return colors[2];
    return colors[3];
  };

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Intensity',
        backgroundColor: intensityData.map(getColor),
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        data: intensityData,
        borderRadius: 5, // Rounded bars for better UI
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, bottom: 20, left: 10, right: 10 },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: { size: 12, weight: 'bold' },
        color: useColorModeValue('black', 'white'),
        formatter: (value) => value + '%',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: 'bold' } },
      },
      y: {
        grid: { color: useColorModeValue('gray.200', 'gray.700') },
        ticks: {
          font: { size: 12, weight: 'bold' },
          callback: (value) => value + '%',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce',
    },
  };

  return (
    <Box
      p={6}
      maxW="900px"
      mx="auto"
      borderRadius="10px"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      overflowX="auto"
    >
      <Heading as="h2" fontSize={{ base: 'lg', md: '2xl' }} mb={4} textAlign="center">
        Intensity Chart
      </Heading>
      <Box height="450px">
        <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
      </Box>
    </Box>
  );
};

export default IntensityChart;
