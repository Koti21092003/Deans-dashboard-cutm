import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Flex,
  Heading,
  Select,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";

const CountryChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const [selectedCountry, setSelectedCountry] = useState("United States of America");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const countryData = data.filter((entry) => entry.country === selectedCountry);

    const sectors = {};
    countryData.forEach((entry) => {
      if (!sectors[entry.sector]) {
        sectors[entry.sector] = 0;
      }
      sectors[entry.sector] += entry.intensity; // Summing intensities
    });

    const sectorLabels = Object.keys(sectors);
    const sectorIntensities = Object.values(sectors);

    setChartData({
      labels: sectorLabels,
      datasets: [
        {
          label: "Intensity",
          data: sectorIntensities,
          backgroundColor: colorMode === "light" ? "rgba(79, 59, 169, 0.7)" : "rgba(144, 104, 190, 0.7)",
          borderRadius: 5,
        },
      ],
    });
  }, [selectedCountry, data, colorMode]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true, grid: { color: colorMode === "light" ? "gray.200" : "gray.700" } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Box 
      p={6} 
      shadow="md" 
      bg={useColorModeValue("white", "gray.800")} 
      borderRadius="10px" 
      maxW="1000px" 
      mx="auto"
      overflowX="auto"
    >
      <Flex direction="column" align="center">
        <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} textAlign="center">
          Country Chart
        </Heading>

        <Select 
          value={selectedCountry} 
          onChange={(e) => setSelectedCountry(e.target.value)} 
          mb={4} 
          w={{ base: "full", md: "250px" }} 
          bg={useColorModeValue("gray.100", "gray.700")}
          fontWeight="bold"
        >
          {["United States of America", "Mexico", "Nigeria", "Lebanon", "Russia", "Saudi Arabia"].map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </Select>

        <Box height="450px" w="100%" maxW="900px">
          {chartData ? <Bar data={chartData} options={chartOptions} /> : <p>Loading Chart...</p>}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountryChart;
