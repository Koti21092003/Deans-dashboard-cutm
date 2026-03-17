import React from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  useDisclosure,
  Divider,
  Text,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronRightIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  MdDashboard,
  MdAssignment,
  MdExitToApp,  
} from "react-icons/md";

const AdminDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="100%">
      {/* Sidebar Open Button */}
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={onOpen}
        position="fixed"
        top="50%"
        left="0"
        transform="translateY(-50%)"
        zIndex="10"
        colorScheme="teal"
        variant="solid"
        size={{ base: "sm", md: "md" }} // Adjust button size on mobile
        aria-label="Open Sidebar"
      />

      {/* Sidebar Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg={useColorModeValue("gray.100", "gray.800")}
          color={useColorModeValue("gray.800", "white")}
          maxW={{ base: "80%", md: "300px" }} // Restrict width for smaller screens
        >
          <DrawerHeader
            borderBottomWidth="1px"
            fontSize="xl"
            fontWeight="bold"
            color="teal.500"
            display="flex"
            alignItems="center"
          >
            <SettingsIcon mr={2} /> Admin Dashboard
          </DrawerHeader>

          <DrawerBody>
            <Text fontSize="lg" mb={2} fontWeight="bold">
              Menu
            </Text>
            <Divider
              mb={4}
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />

            <List spacing={4}>
              <Link to={'/main'}>
                <ListItem cursor="pointer" _hover={{ color: "teal.500" }}>
                  <ListIcon as={MdDashboard} fontSize="xl" />
                  Home
                </ListItem>
              </Link>

              <Link to={'/dashboard'}>
                <ListItem cursor="pointer" _hover={{ color: "teal.500" }}>
                  <ListIcon as={MdDashboard} fontSize="xl" />
                  Attendance
                </ListItem>
              </Link>

              <Link to={'/results'}>
                <ListItem cursor="pointer" _hover={{ color: "teal.500" }}>
                  <ListIcon as={MdAssignment} fontSize="xl" />
                  Results
                </ListItem>
              </Link>

              <ListItem cursor="pointer" onClick={onClose} _hover={{ color: "red.500" }}>
                <ListIcon as={MdExitToApp} fontSize="xl" />
                Logout
              </ListItem>
            </List>

            {/* Footer Section */}
            <Flex alignItems="center" mt={{ base: "20%", md: "60%" }}>
              <Box textAlign="center">
                <Heading size="md">DEAN DASHBOARD</Heading>
                <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
                  Centurion University
                </Text>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default AdminDashboard;
