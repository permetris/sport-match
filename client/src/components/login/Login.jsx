/* eslint-disable react/no-unescaped-entities */
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginForm } from './LoginForm';
import { useToastifyError } from '../../hooks/useToastify';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { email: formData.email, password: formData.password };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,
        request
      );

      localStorage.setItem('token', response.headers.authorization);
      localStorage.setItem('role', response.headers.role);
      localStorage.setItem('userid', response.headers.userid);

      navigate('/');
    } catch (err) {
      useToastifyError(err);
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
    <LoginForm handleSubmit={handleSubmit} handleChange={handleChange }/>
  );
};

export default Login;
