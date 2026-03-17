import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const RegionChart = ({ data, onRegionClick }) => {
  if (!data || typeof data !== 'object' || Object.values(data).every((val) => val === 0)) {
    return (
      <Center>
        <Text fontSize="lg" fontWeight="semibold" color="gray.500">
          No data available
        </Text>
      </Center>
    );
  }

  // Prepare data for the Pie chart
  const chartData = {
    labels: ['Below 65%', '65%-75%', 'Above 75%'],
    datasets: [
      {
        data: [data.below65, data.between65And75, data.above75],
        backgroundColor: ['#FF6B81', '#FFD166', '#4A90E2'],
        hoverBackgroundColor: ['#FF4D6A', '#FFC54D', '#3A7AD9'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index; // Get the clicked section index
      const region = ['below65', 'between65And75', 'above75'][index]; // Map index to region keys
      if (onRegionClick) {
        onRegionClick(region); // Trigger parent click handler
      }
    }
  };

  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center" color="gray.700">
        Overall Attendance Distribution
      </Text>
      <Center>
        <Box width={{ base: '100%', md: '400px' }} height={{ base: '300px', md: '400px' }}>
          <Pie
            data={chartData}
            options={{
              onClick: handleChartClick,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                    color: 'gray.700',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const value = tooltipItem.raw || 0;
                      return ` ${value} students`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Center>
    </Box>
  );
};

export default RegionChart;
