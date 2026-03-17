import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const PieChart = ({ data }) => {
  const sectors = data.reduce((acc, entry) => {
    acc[entry.sector] = (acc[entry.sector] || 0) + entry.intensity;
    return acc;
  }, {});

  const colors = [
    "#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#F3722C", "#8B5CF6",
    "#F77F00", "#34D399", "#3B82F6", "#DC2626", "#A855F7", "#FF9F1C"
  ];

  const chartData = {
    labels: Object.keys(sectors),
    datasets: [
      {
        data: Object.values(sectors),
        backgroundColor: Object.keys(sectors).map((_, index) => colors[index % colors.length]),
        hoverBackgroundColor: Object.keys(sectors).map((_, index) => colors[index % colors.length] + "CC"), // Slightly transparent on hover
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
          color: useColorModeValue("gray.700", "gray.300"),
        },
      },
      tooltip: {
        backgroundColor: "#333",
        bodyFont: {
          size: 14,
        },
        padding: 10,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <Box
      p={6}
      borderRadius="2xl"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      maxW={{ base: "90%", md: "600px" }}
      mx="auto"
      mt={10}
    >
      <Heading as="h2" fontSize="xl" fontWeight="bold" mb={4} textAlign="center" color={useColorModeValue("gray.700", "white")}>
        Sector Chart
      </Heading>

      <Box height={{ base: "300px", md: "400px" }} mx="auto">
        <Pie data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default PieChart;
