import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Box, Heading, Text, Center } from '@chakra-ui/react';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js v4 compatibility
Chart.register(LinearScale, PointElement, Tooltip, Legend);

const RelevanceBubbleChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Center>
        <Text fontSize="lg" fontWeight="bold" color="gray.500">
          No data available
        </Text>
      </Center>
    );
  }

  const chartData = {
    datasets: [
      {
        label: 'Relevance',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: data.map((item) => ({
          x: item.likelihood,
          y: item.impact,
          r: Math.max(item.relevance * 3, 5), // Ensures minimum size for visibility
        })),
      },
      {
        label: 'Intensity',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        data: data.map((item) => ({
          x: item.likelihood,
          y: item.impact,
          r: Math.max(item.intensity * 2, 5),
        })),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Likelihood',
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 1,
          max: 10,
          min: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Impact',
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 1,
          max: 10,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const { x, y, r } = context.raw;
            return `${datasetLabel}: Likelihood: ${x}, Impact: ${y}, Size: ${r}`;
          },
        },
      },
    },
  };

  return (
    <Box
      maxW="90%"
      mx="auto"
      p={5}
      mt={8}
      borderRadius={18}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <Heading as="h2" mb={4} textAlign="center">
        Relevance Chart
      </Heading>
      <Box height="400px">
        <Bubble data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default RelevanceBubbleChart;
