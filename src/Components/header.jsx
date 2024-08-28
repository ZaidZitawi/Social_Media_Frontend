import * as React from 'react';
import PropTypes from 'prop-types';
import Logo from "../images/logoo.png";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountPanel from './AccountPanel';
import { Link } from 'react-router-dom'; // If you're using React Router

const logoStyle = {
  width: '50px',
  height: '50px',
  cursor: 'pointer',
};

// Define color palette
const primaryBlue = '#004696';
const secondaryBlue = '#1E8EAB';
const linkColor = '#004696'; // Primary Blue for the link text
const linkHoverColor = '#1E8EAB'; // Secondary Blue for hover state
const grayishBlue = '#F2F5F7';

function Header({ mode, toggleColorMode }) {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            {/* Left Section - Logo and Links */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={Logo}
                style={logoStyle}
                alt="logo of platform"
              />
              <MenuItem
                sx={{ py: '6px', px: '12px' }}
              >
                <Link
                  to="/faq" // Adjust the path accordingly
                  style={{
                    color: linkColor,
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.color = linkHoverColor)}
                  onMouseOut={(e) => (e.target.style.color = linkColor)}
                >
                  FAQ
                </Link>
              </MenuItem>
              <MenuItem
                sx={{ py: '6px', px: '12px' }}
              >
                <Link
                  to="/about" // Adjust the path accordingly
                  style={{
                    color: linkColor,
                    textDecoration: 'none',
                    fontSize: '16px',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.color = linkHoverColor)}
                  onMouseOut={(e) => (e.target.style.color = linkColor)}
                >
                  About
                </Link>
              </MenuItem>
            </Box>

            {/* Right Section - Search Bar and Account Panel */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  pl: 2,
                  pr: 1,
                  maxWidth: 250,
                  border: `1px solid ${linkHoverColor}`, // Border color matching the hover color
                  '&:hover': {
                    borderColor: linkHoverColor, // Keeping it consistent with hover color
                  },
                }}
              >
                <SearchIcon sx={{ color: linkHoverColor }} />
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{
                    ml: 1,
                    flex: 1,
                    color: primaryBlue,
                  }}
                />
              </Box>
              <AccountPanel />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
