// src/Components/Logout.jsx
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin'); // Redirect to the signin page
  };

  return (
    <Container component="main" maxWidth="xs">
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
    </Container>
  );
};

export default Logout;
