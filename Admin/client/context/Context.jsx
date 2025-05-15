import React, { createContext, useContext } from "react";

const RoleContext = createContext("");

export const RoleProvider = ({ children }) => {
  // const url = import.meta.env.VITE_URL;
  const url = "http://127.0.0.1:5000";

  return (
    <RoleContext.Provider
      value={{
        url,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
export default RoleProvider;
