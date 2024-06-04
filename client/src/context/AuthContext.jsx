import React, { createContext, useState, useContext } from "react";
import { useLoginUserMutation } from "../slices/apiSlice";
import store from "../store/store";
import { setToken } from "../slices/authSlice";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [triggerLogin] = useLoginUserMutation();

  const [user, setUser] = useState(undefined);

  const login = async (userData) => {
    const response = await triggerLogin(userData);

    if (response?.data?.user) {
      setUser(response.data.user);
      store.dispatch(setToken(response.data.user.token));
      return response.data.user;
    }
    return undefined;
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
