import { useState, React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegForm } from "./Form";
import { successMessages } from "../../utils/responseMessages";
import { useAuth } from "../../context/AuthContext";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../hooks/useToastify";
import { ROLES } from "../../utils/roles";
import { useCreateUserMutation } from "../../slices/apiSlice";

export const Registration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [createUser, { isSuccess, isError, error }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: pathname === "/register" ? "USER" : "ADMIN",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const request = { ...formData };
      if (formData.confirmPassword === formData.password) {
        delete request.confirmPassword;
        createUser(request).unwrap();
      } else {
        toastWarning("Passwords do not match!!");
      }
    } catch (err) {
      toastError(err);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toastSuccess("Registration successfull!");
    }
    if (isError) {
      toastError(error);
    }
  },[isSuccess,isError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (pathname === "/admin/register" && user.role !== ROLES.ADMIN) {
    return (
      <>
        <h1> 403 Unauthorized</h1>
        <a href="/">Home</a>
      </>
    );
  }
  return (
    <RegForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};

export default Registration;
