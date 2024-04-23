import { useState, React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RegForm } from "./Form";
import { successMessages } from "../../utils/responseMessages";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "../../hooks/useToastify";

export const Registration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        // eslint-disable-next-line no-undef
        await axios.post(
          `${import.meta.env.REACT_APP_SERVER_URL}/user`,
          request,
        );
        navigate("/login");
        toastSuccess(successMessages.userRegistered);
      } else {
        toastWarning("Passwords do not match!!");
      }
    } catch (err) {
      toastError(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  if (pathname === "/admin/register" && user.role === "USER") {
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
