import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { findUserByEmail } from '../../api/userApi.js';
import { getProfileByUserId } from '../../api/profileApi.js';

const AvatarButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ccc;
  transition: border-color 150ms ease;

  &:hover {
    border-color: #999;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px #cce0ff;
    outline: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  `,
);

export default function MenuIntroduction() {
  const [profileImage, setProfileImage] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        // Decode email and user ID from token
        let email = localStorage.getItem('email');
        let userId = localStorage.getItem('userId');
        let storedProfileImage = localStorage.getItem('profileImage');
        let name = localStorage.getItem('name');

        console.log('Stored Email:', email);
        console.log('Stored UserId:', userId);
        console.log('Stored Profile Image:', storedProfileImage);
        console.log('Stored Name:', name);

        if (!email || !userId || !storedProfileImage || !name) {
          email = decodeTokenEmail(token);
          if (!email) throw new Error('Invalid token, email not found');

          const userResponse = await findUserByEmail(email, token);
          userId = userResponse.data.userId;
          name = userResponse.data.name;
          console.log('User response:', userResponse);

          const profileResponse = await getProfileByUserId(userId);
          console.log('Profile response:', profileResponse);
          const imageName = profileResponse.data.profilePictureUrl;
          const imageUrl = `/uploads/${imageName}`;
          
          // Set the profile image URL
          setProfileImage(imageUrl);

          // Store email, userId, and profileImage in local storage
          localStorage.setItem('email', email);
          localStorage.setItem('userId', userId);
          localStorage.setItem('profileImage', imageUrl);
          localStorage.setItem('name', name);
        } else {
          // If profileImage is available in local storage, use it
          setProfileImage(storedProfileImage);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfileImage();
  }, []);

  React.useEffect(() => {
    console.log('Profile image updated:', profileImage);
  }, [profileImage]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <AvatarButton>
        {profileImage ? (
          <img src={profileImage} alt="User Profile" />
        ) : (
          <img src="/uploads/default-profile.png" alt="Default User Profile" />
        )}
      </AvatarButton>
      <Menu slots={{ listbox: AnimatedListbox }}>
        <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
        <MenuItem onClick={createHandleMenuClick('Language settings')}>
          Language settings
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}

// Extract email from token
const decodeTokenEmail = (token) => {
  if (!token) {
    console.error('No token provided');
    return null;
  }

  try {
    // Split the token into its parts
    const [header, payload] = token.split('.');
    console.log('Header:', header);
    console.log('Payload:', payload);

    // Decode the base64 URL encoded payload
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64);
    console.log('Decoded Payload:', decodedPayload);

    // Parse JSON
    const parsedPayload = JSON.parse(decodedPayload);
    console.log('Parsed Payload:', parsedPayload);

    // Extract email from the 'sub' field
    return parsedPayload.sub || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #ccc;
  color: #000;
  box-shadow: 0px 4px 30px #ccc;
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `,
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid #cce0ff;
    background-color: #f0f7ff;
    color: #000;
  }

  &.${menuItemClasses.disabled} {
    color: #999;
  }
  `,
);
