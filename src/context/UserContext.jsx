import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const userLogout = () => {
    setUser({});
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cart");
  };

  return (
    <UserContext.Provider value={{ user, login, logout: userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
