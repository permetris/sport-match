import React, { createContext, useState, useContext } from "react";
import { useLoginUserMutation } from "../slices/apiSlice";
import store from "../store/store";
import { setToken } from "../slices/authSlice";
import { toastError, toastSuccess } from "../hooks/useToastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [triggerLogin] = useLoginUserMutation();
  const [user, setUser] = useState(undefined);

  const login = async (userData) => {
    try {
      const response = await triggerLogin(userData).unwrap();

      if (response.user) {
        setUser(response.user);
        store.dispatch(setToken(response.user.token));
        toastSuccess(`Welcome ${response.user.name} ${response.user.surname}`);
        return response.user;
      }
      return undefined;
    } catch (error) {
      toastError(error);
      return undefined;
    }
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
