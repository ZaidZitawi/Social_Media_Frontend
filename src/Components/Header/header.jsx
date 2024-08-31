import * as React from 'react';
import PropTypes from 'prop-types';
import Logo from "../../images/logoo.png";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountPanel from './AccountPanel';
import { Link } from 'react-router-dom'; // If you're using React Router
import './header.css'; // Import the CSS file

function Header() {
  return (
    <div>
      <AppBar
        position="fixed"
        className="header-appbar"
        style={{ backgroundColor: 'transparent', boxShadow: 'none' }} // Enforcing transparency
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            className="header-toolbar"
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={Logo}
                className="header-logo"
                alt="logo of platform"
              />
              <MenuItem className="header-menu-item">
                <Link
                  to="/faq" // Adjust the path accordingly
                  className="header-link"
                >
                  FAQ
                </Link>
              </MenuItem>
              <MenuItem className="header-menu-item">
                <Link
                  to="/about" // Adjust the path accordingly
                  className="header-link"
                >
                  About
                </Link>
              </MenuItem>
            </Box>

            {/* Right Section - Search Bar and Account Panel */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box className="header-search-bar">
                <SearchIcon className="header-search-icon" />
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  className="header-search-input"
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



export default Header;
