import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import EmailReader from "../components/EmailReader";
import Navbar from "../components/Navbar";
// import HomePage from "../components/HomePage";
import Login from "../components/Login";
import AdminLogin from "../components/AdminLogin";
import AdminOptions from "../components/AdminOptions";
import { useRole } from "../context/RoleContext";
import NotFound from "../components/NotFound";
import SelectOptions from "../components/SelectOptions";

function App() {
  const { role, token } = useRole();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid home_page px-0 d-flex justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<Login />} />

          {role === "user" ? (
            <>
              <Route path="/user/options/emailreader" element={<EmailReader />} />
              <Route path="/user/options" element={<SelectOptions />} />
              <Route
                path="/user"
                element={<Navigate replace to="/user/options" />}
              />
              <Route path="/user/*" element={<NotFound />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/*" element={<NotFound />} />
            </>
          ) : (
            <>
              {role === "admin" ? (
                <>
                  <Route path="/admin/managecodes" element={<AdminOptions />} />
                  <Route
                    path="/admin"
                    element={<Navigate replace to="/admin/managecodes" />}
                  />
                  <Route path="/admin/*" element={<NotFound />} />
                  <Route path="/user" element={<Login />} />
                  <Route path="/user/*" element={<NotFound />} />
                </>
              ) : (
                <>
                  <Route path="/admin/*" element={<NotFound />} />
                  <Route path="/user/*" element={<NotFound />} />
                  <Route path="/user" element={<Login />} />
                  <Route path="/admin" element={<AdminLogin />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
