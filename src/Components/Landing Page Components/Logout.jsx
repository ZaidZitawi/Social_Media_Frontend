import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/LandingPage'); // Redirect to the signin page
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: '90vh', // Half the page height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          Are you sure you want to log out?
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
