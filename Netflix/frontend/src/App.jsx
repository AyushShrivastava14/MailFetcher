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
      <div className="container-fluid home_page px-0">
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100vh" }}>
        <Navbar />
        <video
          src="/Netflix_bg_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="bg-vid"
        ></video>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Routes>
              <Route path="/" element={<Login />} />

              {role === "user" ? (
                <>
                  <Route
                    path="/user/options/emailreader"
                    element={<EmailReader />}
                  />
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
                      <Route
                        path="/admin/managecodes"
                        element={<AdminOptions />}
                      />
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
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
