import React, { createContext, useState, useContext } from "react";
import { useLoginUserMutation } from "../api/slice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [triggerLogin, result] = useLoginUserMutation();
  const [user, setUser] = useState(undefined);

  const login = async (userData) => {
    const response = await triggerLogin(userData);
    console.log(response.data);
    console.log(result);

    if (response?.data.user) {
      setUser(response.data.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
