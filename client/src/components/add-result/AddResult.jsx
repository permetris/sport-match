import { useState, React } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddResultForm } from './AddResultForm';
import axios from 'axios';
import { isLoggedIn } from '../../utils/isLoggedIn';
import { useToastifyError, useToastifySuccess } from '../../hooks/useToastify';

export const AddResult = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    blackTeamScore: '',
    whiteTeamScore: ''
  });

  const user = isLoggedIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const request = { ...formData };
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/match/${id}/result`, request, {
        headers: {
          Authorization: token
        }
      });
      useToastifySuccess('Match results successfully added!');
      navigate(`/match/${id}`);
    } catch (err) {
      useToastifyError(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (user.role === 'USER') {
    return <>
      <h1> 403 Unauthorized</h1>
      <a href='/'>Home</a>
    </>;
  }
  return (
    <AddResultForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange } />
  );
};

export default AddResult;
