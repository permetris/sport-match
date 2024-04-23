/* eslint-disable react/no-unescaped-entities */
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './Form';
import { useAuth } from '../../context/AuthContext';
import { toastError } from '../../hooks/useToastify';

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = { email: formData.email, password: formData.password };
    const success = login(request);
    if (success) {
      navigate('/');
    } else { 
      toastError("Something went wrong")
    }

  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      {!user && <LoginForm submitLogin={handleSubmit} handleChange={handleChange} />}
    </>
  );
};

export default Login;
