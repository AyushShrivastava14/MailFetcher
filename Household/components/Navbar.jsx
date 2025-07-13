import React from "react";
import logo from "../public/Netflix_logo.png";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  return (
    <>
      <nav
        className="navbar navbar-expand-lg position-sticky top-0 z-1"
        data-bs-theme="dark"
        style={{ borderStyle: "none" }}
      >
        <div className="container" style={{ width: "100%" }}>
          {/* Logo */}
          <NavLink to="/" className="navbar-brand">
            <img
              src={logo}
              alt="LOGO"
              style={{
                height: "2.5rem",
                width: "1.5rem",
                margin: "1rem",
              }}
            />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
