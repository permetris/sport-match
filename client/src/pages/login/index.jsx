/* eslint-disable react/no-unescaped-entities */
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = { email: formData.email, password: formData.password };
    login(request);
    navigate('/');
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
      {!user && <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />}
    </>
  );
};

export default Login;
