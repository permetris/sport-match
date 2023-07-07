import { useState, React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RegForm } from './RegForm';
import { successMessages } from '../../utils/responseMessages';
import axios from 'axios';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useToastifyError, useToastifySuccess } from '../../hooks/useToastify';

export const Registration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
    role: pathname === '/register' ? 'USER' : 'ADMIN'
  });

  const user = isLoggedIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const request = { ...formData };
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/user`, request);
      navigate('/login');
      useToastifySuccess(successMessages.userRegistered);
    } catch (err) {
      useToastifyError(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (pathname === '/admin/register' && user.role === 'USER') {
    return <>
      <h1> 403 Unauthorized</h1>
      <a href='/'>Home</a>
    </>;
  }
  return (
    <RegForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange } />
  );
};

export default Registration;
