import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SubjectRegionChart = ({ data, i, subject, percerntageIndex }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const totalPercentages = (data || [])
    .slice(6)
    .map((row) => ({
      percentage: row[percerntageIndex[i]],
      name: row[3],
      rollno: row[2], // Assuming Roll No. is in column 2
    }))
    .filter((row) => row.percentage);

  const categorizedData = {
    'Below 65%': totalPercentages.filter((row) => row.percentage < 65),
    '65%-75%': totalPercentages.filter((row) => row.percentage >= 65 && row.percentage <= 75),
    'Above 75': totalPercentages.filter((row) => row.percentage > 75),
  };

  const regionCounts = Object.keys(categorizedData).reduce((acc, key) => {
    acc[key] = categorizedData[key].length;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: ['#1E88E5', '#D81B60', '#FFC107'],
        hoverBackgroundColor: ['#1565C0', '#C2185B', '#FFB300'],
      },
    ],
  };

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedRegion = Object.keys(categorizedData)[clickedIndex];
      setSelectedRegion(categorizedData[clickedRegion]);
    } else {
      setSelectedRegion(null);
    }
  };

  return (
    <Box w={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }} mx="auto" textAlign="center">
      <Heading as="h2" mb={4} fontSize={{ base: "lg", md: "xl" }}>
        {subject}
      </Heading>
      <Box display="flex" justifyContent="center">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                color: '#fff',
                font: { weight: 'bold', size: 14 },
                formatter: (value) => value,
              },
            },
            onClick: handleChartClick,
          }}
          style={{ maxHeight: '300px' }} // Restrict chart height for better mobile fit
        />
      </Box>
      {selectedRegion && (
        <Box mt={4} bg="gray.100" p={4} borderRadius="md">
          <Heading as="h4" size="md" mb={2}>
            Selected Category Details:
          </Heading>
          <VStack align="start">
            {selectedRegion.map((row, idx) => (
              <Text key={idx} fontSize={{ base: "sm", md: "md" }}>
                {row.rollno} - {row.name}
              </Text>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default SubjectRegionChart;
