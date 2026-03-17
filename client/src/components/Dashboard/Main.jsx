import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import { ChakraProvider, Box, Flex, Button, Heading, Container } from "@chakra-ui/react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

Chart.register(CategoryScale);

const Main = () => {
  return (
    <ChakraProvider>
      <Box minH="100vh" bgGradient="linear(to-r, blue.50, white)">
        <Navbar />
        <Sidebar />

        <Container maxW="lg" centerContent>
          <Box textAlign="center" my={8} p={6} bg="white" boxShadow="lg" borderRadius="lg">
            <Heading size="lg" mb={4} color="blue.700">
              Attendance Dashboard
            </Heading>

            <Flex justify="center" wrap="wrap" gap={6}>
              <Link to="/subjectwise">
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                  transition="0.2s"
                >
                  Subjectwise
                </Button>
              </Link>
              <Link to="/overall">
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                  transition="0.2s"
                >
                  Overall Attendance
                </Button>
              </Link>
            </Flex>
          </Box>
        </Container>

        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default Main;
