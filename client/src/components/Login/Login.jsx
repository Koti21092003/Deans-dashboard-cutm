import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Text,
  Link,
  Image,
} from '@chakra-ui/react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadCredentials = () => {
    const savedUser = sessionStorage.getItem('userCredentials');
    return savedUser ? JSON.parse(savedUser) : null;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const savedCredentials = loadCredentials();

    if (savedCredentials && savedCredentials.email === email && savedCredentials.password === password) {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/main'), 2000);
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    sessionStorage.setItem('userCredentials', JSON.stringify({ email, password }));
    setSuccess('Signup successful! Redirecting...');
    setTimeout(() => navigate('/main'), 2000);
  };

  return (
    <Box
      bg="linear-gradient(to bottom right, #4F3BA9, #9068BE)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container p={8} borderRadius="lg" bg="white" boxShadow="lg" textAlign="center" maxW="400px">
        <Image src="https://course.cutm.ac.in/wp-content/uploads/2022/07/CUTM_Logo.png" alt="CUTM Logo" mb={4} mx="auto" width={{ base: '100px', md: '120px' }} />
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="purple.600">
          {isSignup ? 'Signup Page' : 'Welcome Admin!'}
        </Text>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            {success}
          </Alert>
        )}

        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          {isSignup && (
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>
          )}
          <Button colorScheme="purple" mt={6} w="100%" type="submit">
            {isSignup ? 'Signup' : 'Login'}
          </Button>
          <Text mt={4}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link color="purple.500" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Login here' : 'Signup here'}
            </Link>
          </Text>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;
