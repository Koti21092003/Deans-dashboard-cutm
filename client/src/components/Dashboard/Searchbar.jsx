import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  // State for search query
  const [query, setQuery] = useState("");

  // Handle input change
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      p={4}
      w="100%"
    >
      <InputGroup 
        maxW={{ base: "90%", md: "400px" }} // Responsive width
      >
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          _focus={{ borderColor: "purple.500", boxShadow: "0 0 5px rgba(128,0,128,0.5)" }}
          _hover={{ borderColor: "purple.400" }}
          p={2}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
