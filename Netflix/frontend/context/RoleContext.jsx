import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext("");

export const RoleProvider = ({ children }) => {
  const url = import.meta.env.VITE_URL;
  // const url = "http://127.0.0.1:5000";

  const [role, setRole] = useState("");

  const [subject, setSubject] = useState('');

  const saveSubject = async (subject) => {
    // console.log(subject);
    setSubject(subject);
  }

  const [subject2, setSubject2] = useState('');

  const saveSubject2 = async (subject) => {
    console.log(subject);
    setSubject2(subject);
  }

  const saveRole = async (role) => {
    setRole(role);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        url,
        subject,
        subject2,
        saveRole,
        saveSubject,
        saveSubject2
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
export default RoleProvider;
