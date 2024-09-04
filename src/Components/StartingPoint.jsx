import * as React from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Ensure you're using react-router-dom for navigation

const theme = createTheme({
  palette: {
    primary: {
      main: '#120460',
    },
    secondary: {
      main: '#1E8EAB',
    },
  },
});

export default function StartingPoint() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/SignUp'); // Navigate to the register page
  };

  const handleLoginClick = () => {
    navigate('/SignIn'); // Navigate to the login page
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ color: '#120460', marginBottom: 4 }}>
            Welcome to SocialWave
          </Typography>
          <Button
            variant="contained"
            sx={{ mb: 2, backgroundColor: '#120460', color: '#FFFFFF' }}
            onClick={handleRegisterClick}
            fullWidth
          >
            Register Account
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#1E8EAB', color: '#FFFFFF' }}
            onClick={handleLoginClick}
            fullWidth
          >
            Log In
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
