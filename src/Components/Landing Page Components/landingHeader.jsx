import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '../../images/logoo.png';

// Styled components for custom hover effects
const CustomButton = styled(Button)({
  color: '#FFFFFF',
  marginRight: 16,
  fontSize: '1rem',
  fontWeight: 500,
  transition: 'color 0.3s',
  '&:hover': {
    color: '#1E8EAB',
  },
});

const Header = () => (
  <AppBar
    position="static"
    sx={{
      backgroundColor: '#004696',
      padding: '0 24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Logo and Website Name */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={Logo} alt="Website Logo" style={{ width: 48, height: 48, marginRight: 12 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.75rem',
            color: '#FFFFFF',
          }}
        >
          MyPlatform
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box>
        <CustomButton>About</CustomButton>
        <CustomButton>Contact</CustomButton>
        <CustomButton>Login</CustomButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
