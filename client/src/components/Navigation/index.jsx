import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { toastSuccess, toastError } from '../../hooks/useToastify';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { successMessages } from '../../utils/responseMessages';

const sx = {
  marginRight: 1
};

const Navigation = () => {
  const navigate = useNavigate();
  const onLogoutHandler = async (e) => {
    try {
      e.preventDefault();
      localStorage.clear();
      toastSuccess(successMessages.userLoggedOut);
      navigate('/');
      window.location.reload();
    } catch (err) {
      toastError(err);
    }
  };
  return (
    <AppBar position="fixed" sx={{ paddingLeft: '15%', paddingRight: '15%' }}>
      <Toolbar >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Sport Scheduler
        </Typography>

        <Link href='/'>Home</Link>
        {!isLoggedIn() && <Link sx={sx} color="inherit" underline='hover' href='/login'>Log In</Link>}
        {!isLoggedIn() && <Link sx={sx} color="inherit" underline='hover' href='/register'>Register</Link>}
        {isLoggedIn() && <Link sx={sx} color="inherit" underline='hover' href='/user'>My Profile</Link>}
        {isLoggedIn() && <Link sx={sx} color="inherit" underline='hover' href='/history'>Match History</Link>}
        {isLoggedIn() && <Link sx={sx} color="inherit" underline='hover' onClick={onLogoutHandler} href='/'>Logout</Link>}
      </Toolbar>
    </AppBar >
  );
};

export default Navigation;
