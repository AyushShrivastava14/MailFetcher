import React, { createContext, useContext, useState } from "react";

const RoleContext = createContext("");

export const RoleProvider = ({ children }) => {
  const url = import.meta.env.VITE_URL;
  // const url = "https://mailfetcher-backend.onrender.com";
  // const url = "http://127.0.0.1:5000";

  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole ? savedRole : "";
  });

  const [subject, setSubject] = useState('');

  const saveSubject = async (subject) => {
    console.log(subject);
    setSubject(subject);
  }
  const [subject2, setSubject2] = useState('');

  const saveSubject2 = async (subject) => {
    console.log(subject);
    setSubject2(subject);
  }

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? savedToken : null;
  });

  const saveRole = async (role) => {
    try {
      const response = await fetch(url + "/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate token");
      }
      const data = await response.json();
      const token = data.token;

      await verifyStoredToken(role, token);
      setTimeout(deleteRole, 5 * 60 * 1000);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  const deleteRole = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setRole("");
    setToken(null);
  };

  const verifyStoredToken = async (role, storedToken) => {
    if (storedToken) {
      try {
        const response = await fetch(url + "/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: storedToken }),
        });
        if (!response.ok) {
          throw new Error("Token is invalid or expired");
        }
        const data = await response.json();
        if (data.message === "valid") {
          localStorage.setItem("role", role);
          localStorage.setItem("token", token);
          setToken(token);
          setRole(role);
        } else {
          deleteRole();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        deleteRole();
      }
    }
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        url,
        token,
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
