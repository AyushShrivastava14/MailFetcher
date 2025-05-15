import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "../components/Loading";

// Lazy-loaded components
const Navbar = lazy(() => import("../components/Navbar"));
const Options = lazy(() => import("../components/Options"));
const NotFound = lazy(() => import("../components/NotFound"));

function App() {

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
                <Route path="/" element={<Options />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
