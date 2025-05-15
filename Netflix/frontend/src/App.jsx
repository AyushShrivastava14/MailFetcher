import React, { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useRole } from "../context/RoleContext";
import Loading from "../components/Loading";

// Lazy-loaded components
const EmailReader = lazy(() => import("../components/EmailReader"));
const Navbar = lazy(() => import("../components/Navbar"));
const Login = lazy(() => import("../components/Login"));
const NotFound = lazy(() => import("../components/NotFound"));
const SelectOptions = lazy(() => import("../components/SelectOptions"));
const SignInCodeAccess = lazy(() => import("../components/SignInCodeAccess"));

function App() {
  const { role, access } = useRole();

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
                {role === "user" ? (
                  <>
                    <Route
                      path="/options/emailreader"
                      element={<EmailReader />}
                    />
                    <Route
                      path="/options/code"
                      element={<SignInCodeAccess />}
                    />

                    {access ? (
                      <Route
                        path="/options/code/emailreader"
                        element={<EmailReader />}
                      />
                    ) : (
                      <Route
                        path="/options/code/emailreader"
                        element={<NotFound />}
                      />
                    )}
                    <Route path="/options" element={<SelectOptions />} />
                    <Route
                      path="/"
                      element={<Navigate replace to="/options" />}
                    />
                    <Route path="/*" element={<NotFound />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<NotFound />} />
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
