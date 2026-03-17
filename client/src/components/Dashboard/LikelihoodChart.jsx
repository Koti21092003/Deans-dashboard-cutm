import React from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading } from "@chakra-ui/react";

const LikelihoodRadarChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: data.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(79, 59, 169, 0.4)",
          "rgba(144, 104, 190, 0.4)"
        ),
        borderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(79, 59, 169, 1)",
          "rgba(144, 104, 190, 1)"
        ),
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "white",
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 5,
          stepSize: 1,
          font: {
            size: 12,
            weight: "bold",
          },
        },
        grid: {
          color: useColorModeValue("gray.300", "gray.700"),
        },
        angleLines: {
          color: useColorModeValue("gray.400", "gray.600"),
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuad",
    },
  };

  return (
    <Box
      p={6}
      borderRadius="20px"
      boxShadow="lg"
      mt={10}
      bg={useColorModeValue("white", "gray.800")}
      maxW="900px"
      mx="auto"
      overflowX="auto"
    >
      <Heading as="h2" fontSize="2xl" mb={4} textAlign="center">
        Likelihood Radar Chart
      </Heading>

      <Box height="500px" width="100%">
        <Radar data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default LikelihoodRadarChart;
