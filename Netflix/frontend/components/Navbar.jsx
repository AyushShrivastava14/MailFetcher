import React from "react";
import logo from "../public/Netflix_logo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg position-sticky top-0 z-1"
        data-bs-theme="dark"
        style={{ backgroundColor: "black" }}
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
                margin: "1rem"
              }}
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* List */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{fontSize: "1.1rem"}}>
              <li className="nav-item mx-5">
                <NavLink to="/user" className="nav-link">
                  <span style={{fontWeight: "bolder"}}>Code</span>
                </NavLink>
              </li>

              <li className="nav-item mx-5">
                <NavLink to="/admin" className="nav-link">
                <span style={{fontWeight: "bolder"}}>Admin Login</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}