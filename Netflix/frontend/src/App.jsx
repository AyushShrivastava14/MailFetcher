import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useRole } from "../context/RoleContext";
import Loading from "../components/Loading";

// Lazy-loaded components
const EmailReader = lazy(() => import("../components/EmailReader"));
const Navbar = lazy(() => import("../components/Navbar"));
const Login = lazy(() => import("../components/Login"));
const AdminLogin = lazy(() => import("../components/AdminLogin"));
const AdminOptions = lazy(() => import("../components/AdminOptions"));
const NotFound = lazy(() => import("../components/NotFound"));
const SelectOptions = lazy(() => import("../components/SelectOptions"));


function App() {
  const { role } = useRole();

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
            preload="auto"
            className="bg-vid"
          ></video>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Suspense fallback={<Loading />}>
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
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
