import React, { useState } from 'react';
import { EmailForm } from './EmailForm';
import { useToastifyError } from '../../hooks/useToastify';
import axios from 'axios';

export const SendEmail = () => {
  const [formData, setFormData] = useState();
  const [data, setData] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const request = { email: formData.email };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/forgotten-password`,
        request
      );

      setData(response.data);
      e.target.reset();
    } catch (err) {
      useToastifyError(err);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setFormData({
      email: value
    });
  };

  return (
    <EmailForm handleChange={handleChange} handleSubmit={handleSubmit} data={data} />
  );
};
