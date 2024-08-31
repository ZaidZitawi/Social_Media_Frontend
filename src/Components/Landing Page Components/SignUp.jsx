import * as React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SuccessDialog from './SuccessDialog'; 
import defaultImage from '../../images/image.png'; // Import the default image

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        TechPees
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function SignUp() {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  // Convert the default image to a Blob
  const createDefaultImageBlob = () => {
    return fetch(defaultImage)
      .then(response => response.blob())
      .then(blob => new File([blob], 'default.png', { type: 'image/png' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Use FormData directly with the input names to avoid any confusion or duplication
    const data = new FormData(event.target); // 'event.target' automatically gets the form element and its fields

    // Add the default image to the FormData
    const defaultImageBlob = await createDefaultImageBlob();
    data.append('defaultImage', defaultImageBlob);

    try {
      const response = await fetch('http://localhost:8080/v0/auth/register', {
        method: 'POST',
        body: data,
        // The browser will set the appropriate headers for multipart/form-data automatically
      });

      if (response.ok) {
        setOpenSuccessDialog(true); // Show success dialog on successful registration
      } else {
        const errorResponse = await response.text();
        alert(`Registration failed: ${errorResponse}`);
      }
    } catch (error) {
      alert('Registration failed: An unexpected error occurred.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1E8EAB' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#120460' }}>
            Create Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="name" // Ensure this name matches with what backend expects
                  autoComplete="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email" // Ensure this name matches with what backend expects
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#120460', color: '#FFFFFF' }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <SuccessDialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)} />
    </ThemeProvider>
  );
}
