import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Container,
  Button,
  Image,
  Text,
  useToast,
  useBreakpointValue,
  IconButton,
  Collapse,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const buttonSize = "md"; // Same size for all screens
  const buttonWidth = "140px";

  return (
    <Box
      py={3}
      px={4}
      bg="rgba(255, 255, 255, 0.3)"
      backdropFilter="blur(10px)"
      position="sticky"
      top={0}
      zIndex={100}
      shadow="lg"
      borderRadius="xl"
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Image
              src="https://course.cutm.ac.in/wp-content/uploads/2022/07/CUTM_Logo.png"
              alt="Centurion University Logo"
              boxSize="50px"
              mr={3}
            />
            <Text fontSize="xl" fontWeight="bold" color="black">
              Dean's Dashboard
            </Text>
          </Flex>

          {isMobile ? (
            <IconButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            />
          ) : (
            <Flex gap={3}>
              {[
                { name: "Home", path: "/main", color: "#4F46E5", hover: "#4338CA" },
                { name: "Attendance", path: "/dashboard", color: "#16A34A", hover: "#15803D" },
                { name: "Results", path: "/results", color: "#EAB308", hover: "#CA8A04" },
              ].map(({ name, path, color, hover }) => (
                <Link to={path} key={name}>
                  <Button
                    size={buttonSize}
                    w={buttonWidth}
                    bg={color}
                    color="white"
                    _hover={{ bg: hover }}
                  >
                    {name}
                  </Button>
                </Link>
              ))}

              <Button
                size={buttonSize}
                w={buttonWidth}
                bg="#DC2626"
                color="white"
                _hover={{ bg: "#B91C1C" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <VStack spacing={3} mt={4}>
            {[
              { name: "Home", path: "/main", color: "#4F46E5", hover: "#4338CA" },
              { name: "Attendance", path: "/dashboard", color: "#16A34A", hover: "#15803D" },
              { name: "Results", path: "/results", color: "#EAB308", hover: "#CA8A04" },
            ].map(({ name, path, color, hover }) => (
              <Link to={path} key={name}>
                <Button size={buttonSize} w={buttonWidth} bg={color} color="white" _hover={{ bg: hover }}>
                  {name}
                </Button>
              </Link>
            ))}

            <Button size={buttonSize} w={buttonWidth} bg="#DC2626" color="white" _hover={{ bg: "#B91C1C" }} onClick={handleLogout}>
              Logout
            </Button>
          </VStack>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar;
