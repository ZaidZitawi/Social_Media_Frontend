import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function SuccessDialog({ open, onClose }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/signin'); // Redirect to the sign-in form
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: 'green' }} />
          Registration Successful!
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Congratulations! Your account has been created successfully. Click the button below to sign in.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          sx={{ width: '100%', bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }}
        >
          Go to Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}
