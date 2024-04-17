import React, { createContext, useState, useContext } from 'react';
import { useLoginUserMutation } from '../api/slice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [triggerLogin, data, result] = useLoginUserMutation();
  const [user, setUser] = useState(undefined);

  const login = async (userData) => {
    const data = await triggerLogin(userData);
    setUser(data.data);
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
