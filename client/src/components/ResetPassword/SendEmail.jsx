import React, { useState } from "react";
import { EmailForm } from "./EmailForm";
import { toastError, toastSuccess } from "../../hooks/useToastify";

import { useSendEmailForPasswordMutation } from "../../slices/apiSlice";
import { useNavigate } from "react-router-dom";

export const SendEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [sendResetPassword] = useSendEmailForPasswordMutation();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await sendResetPassword({ email }).unwrap();
      if (result.success) {
        toastSuccess(result.message);
        navigate("/login");
      }
    } catch (error) {
      toastError(error);
    }
  };
  return <EmailForm handleChange={handleChange} handleSubmit={handleSubmit} />;
};
