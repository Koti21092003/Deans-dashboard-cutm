import React from "react";
import { Box, Text, Link, Flex, Icon, Stack, useColorModeValue } from "@chakra-ui/react";
import { RiFacebookBoxFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Box bg={bgColor} py={4} mt={8} w="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="container.lg"
        mx="auto"
        px={4}
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Copyright Text */}
        <Text fontSize="sm" color={textColor} mb={{ base: 3, md: 0 }}>
          &copy; {new Date().getFullYear()} Centurion University. All rights reserved.
        </Text>

        {/* Links & Social Media */}
        <Stack direction={{ base: "column", md: "row" }} align="center" spacing={4}>
          <Link fontSize="sm" color={textColor} _hover={{ color: hoverColor }}>
            Privacy Policy
          </Link>
          <Link fontSize="sm" color={textColor} _hover={{ color: hoverColor }}>
            Terms of Service
          </Link>

          {/* Social Icons */}
          <Flex>
            <Link href="#" isExternal mx={2}>
              <Icon as={RiFacebookBoxFill} boxSize={6} color={textColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="#" isExternal mx={2}>
              <Icon as={RiTwitterFill} boxSize={6} color={textColor} _hover={{ color: hoverColor }} />
            </Link>
            <Link href="#" isExternal mx={2}>
              <Icon as={RiInstagramFill} boxSize={6} color={textColor} _hover={{ color: hoverColor }} />
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
