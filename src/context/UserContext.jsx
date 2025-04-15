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

  const userLogout = () => {
    setUser({});
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("cart");
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
