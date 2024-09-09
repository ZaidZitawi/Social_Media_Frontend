import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('name');

    if (storedProfileImage) {
      setProfileImage(`/uploads/${storedProfileImage}`);
    } else {
      setProfileImage('/uploads/default-profile.png');
    }

    console.log('Stored Profile Image:', storedProfileImage);
    console.log('Stored Name:', storedName);

  }, []);

  React.useEffect(() => {
    console.log('Profile image updated:', profileImage);
  }, [profileImage]);

  const handleMenuItemClick = (path) => (event) => {
    event.preventDefault();
    navigate(path); // Navigate to the specified path
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
        <MenuItem onClick={handleMenuItemClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleMenuItemClick('/settings')}>Settings</MenuItem>
        <MenuItem onClick={handleMenuItemClick('/logout')}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}

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
