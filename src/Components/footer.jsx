import * as React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => (
  <Box
    sx={{
      padding: 4,
      backgroundColor: '#004696',
      color: '#FFFFFF',
      textAlign: 'center',
      marginTop: 'auto',
      position: 'relative',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <IconButton href="#" color="inherit">
        <FacebookIcon sx={{ transition: 'color 0.3s', '&:hover': { color: '#1E8EAB' } }} />
      </IconButton>
      <IconButton href="#" color="inherit">
        <TwitterIcon sx={{ transition: 'color 0.3s', '&:hover': { color: '#1E8EAB' } }} />
      </IconButton>
      <IconButton href="#" color="inherit">
        <InstagramIcon sx={{ transition: 'color 0.3s', '&:hover': { color: '#1E8EAB' } }} />
      </IconButton>
    </Box>
    <Typography variant="body2" sx={{ fontWeight: 400, marginBottom: 2 }}>
      {'Copyright © '}
      <Link href="#" color="inherit" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
        My Social Media Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  </Box>
);

export default Footer;
