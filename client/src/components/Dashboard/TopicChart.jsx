import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';

const TopicsPolarAreaChart = ({ data }) => {
  const topics = data.map(item => item.topic);

  const chartData = {
    labels: topics,
    datasets: [
      {
        data: data.map(item => item.relevance),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Red
          'rgba(54, 162, 235, 0.6)',  // Blue
          'rgba(75, 192, 192, 0.6)',  // Teal
          'rgba(255, 206, 86, 0.6)',  // Yellow
          'rgba(153, 102, 255, 0.6)', // Purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',    // Red
          'rgba(54, 162, 235, 1)',    // Blue
          'rgba(75, 192, 192, 1)',    // Teal
          'rgba(255, 206, 86, 1)',    // Yellow
          'rgba(153, 102, 255, 1)',   // Purple
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        max: 5,
      },
    },
  };

  return (
    <Box maxW="100%" h={{ base: "300px", md: "400px" }} p={4} boxShadow="md" borderRadius="lg" bg="white">
      <Heading as="h2" mb={4} size="md" textAlign="center">
        Topics Chart
      </Heading>
      <Box h="100%">
        <PolarArea data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default TopicsPolarAreaChart;
