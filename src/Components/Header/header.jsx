import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../../images/logoo.png";
import './header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(`http://localhost:8080/v0/user/api/search/users`, {
        params: { name: searchTerm },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data && response.data.length > 0) {
        // Assuming you want to navigate to a profile of the first suggestion
        const userId = response.data[0].userId;
        setSearchTerm('');
        setSuggestions([]);
        setNoResults(false);
        navigate(`/Profile/${userId}`);
      } else {
        setNoResults(true);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const firstLetter = value.trim().charAt(0).toLowerCase();
      try {
        const response = await axios.get(`http://localhost:8080/v0/user/api/search/users`, {
          params: { name: value },
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.data && response.data.length > 0) {
          // Filter suggestions to include only those starting with the entered letter
          const filteredSuggestions = response.data.filter(user =>
            user.name.toLowerCase().startsWith(firstLetter)
          );
          setSuggestions(filteredSuggestions);
          setNoResults(filteredSuggestions.length === 0);
        } else {
          setSuggestions([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setNoResults(true);
      }
    } else {
      setSuggestions([]);
      setNoResults(false);
    }
  };

  const handleSuggestionClick = (userId) => {
    setSearchTerm('');
    setSuggestions([]);
    setNoResults(false);
    navigate(`/Profile/${userId}`);
  };

  return (
    <AppBar
      position="fixed"
      className="header-appbar"
      style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="regular" className="header-toolbar">
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={Logo} className="header-logo" alt="logo of platform" />
            <MenuItem className="header-menu-item">
              <Link to="/faq" className="header-link">FAQ</Link>
            </MenuItem>
            <MenuItem className="header-menu-item">
              <Link to="/about" className="header-link">About</Link>
            </MenuItem>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box className="header-search-bar">
              <SearchIcon className="header-search-icon" />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                className="header-search-input"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </Box>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((user) => (
                  <li key={user.userId} onClick={() => handleSuggestionClick(user.userId)}>
                    {user.name} {/* Adjust based on UserDto structure */}
                  </li>
                ))}
              </ul>
            )}
            {noResults && (
              <div className="no-results">
                User not found
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
