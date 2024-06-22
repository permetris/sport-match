/* eslint-disable react/no-unescaped-entities */
import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./Form";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/roles";
import { toastSuccess } from "../../hooks/useToastify";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    if (e.key === "Enter") console.log("enter pressed");
    const request = { email: formData.email, password: formData.password };
    const user = await login(request);
    if (user) {
      if (user.role === ROLES.USER) {
        return navigate("/");
      }
      if (user.role === ROLES.ADMIN) {
        return navigate("/dashboard");
      }
      toastSuccess(`Welcome ${user.name} ${user.surname}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {!user && (
        <LoginForm submitLogin={handleSubmit} handleChange={handleChange} />
      )}
    </>
  );
};

export default Login;
