import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { toastSuccess, toastError } from '../../hooks/useToastify';
import { useNavigate, Link } from 'react-router-dom';
import { successMessages } from '../../utils/responseMessages';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const onLogoutHandler = (e) => {
    try {
      logout();
      toastSuccess(successMessages.userLoggedOut);
      navigate('/');
    } catch (err) {
      toastError(err);
    }
  };
  return (
    <AppBar position="fixed" sx={{ paddingLeft: '15%', paddingRight: '15%' }}>
      <Toolbar >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href='/'>Sport Scheduler</Link>
        </Typography>

        {!user && <Link className='text-red-900' to='/login'>Log In</Link>}
        {!user && <Link to='/register'>Register</Link>}
        {user && <Link to={`/user/${user.username}`}>My Profile</Link>}
        {user && <Link to='/history'>Match History</Link>}
        {user && <Link onClick={onLogoutHandler} to='/'>Logout</Link>}
      </Toolbar>
    </AppBar >
  );
};

export default Navigation;
