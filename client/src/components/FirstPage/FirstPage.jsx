import { ChakraProvider, Box, Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Dashboard/Navbar";
import Footer from "../Dashboard/Footer";
import Sidebar from "../Dashboard/Sidebar";

const FirstPage = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        px={{ base: 4, md: 8 }}
        py={6}
        textAlign="center"
      >
        <Heading as="h1" fontSize={{ base: "2xl", md: "3xl" }} mb={4}>
          Welcome to Dashboard
        </Heading>
        
        <Box maxW="900px" w="100%" mx="auto">
          <Image 
            src="https://images.shiksha.com//mediadata/images//1731922041phpAAhUFA.jpeg"
            alt="Centurion University"
            width="100%"
            height="auto"
            objectFit="cover"
            borderRadius="10px"
            boxShadow="lg"
          />
        </Box>
      </Flex>

      <Footer />
    </ChakraProvider>
  );
};

export default FirstPage;
