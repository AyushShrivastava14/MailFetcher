import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "../components/Loading";
import { useRole } from "../context/RoleContext";

// Lazy-loaded components
const EmailReader = lazy(() => import("../components/EmailReader"));
const Navbar = lazy(() => import("../components/Navbar"));
const Login = lazy(() => import("../components/Login"));
const NotFound = lazy(() => import("../components/NotFound"));

function App() {
  const { role } = useRole();

  return (
    <BrowserRouter>
      <div className="container-fluid home_page px-0">
        <div style={{  backgroundColor: "black", maxHeight: "100vh" }}>
          <Navbar />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Suspense fallback={<Loading />}>
              <Routes>
                {role === "user" ? (
                  <>
                    <Route
                      path="/emailreader"
                      element={<EmailReader />}
                    />
                    <Route
                      path="/"
                      element={<Navigate replace to="/emailreader" />}
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
