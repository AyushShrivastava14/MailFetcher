import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPass = import.meta.env.VITE_ADMIN_PASS;

export default function AdminLogin() {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveRole } = useRole();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === adminEmail && password === adminPass) {
      saveRole("admin");
      navigate("/admin/managecodes");
    } else {
      setTimeout(() => {
        alert("Invalid email or password");
      }, 100);
    }
  };

  return (
    <div
      className="p-5"
      style={{
        width: "fit-content",
        opacity: "0.85",
        marginBottom: "10.5rem",
      }}
    >
      <h1
        className="fw-bold mb-3 d-flex justify-content-center heading-sm"
        style={{ color: "white" }}
      >
        Admin Login
      </h1>
      <form
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="d-block p-3 input-sm"
          style={{
            borderRadius: "5px",
            border: "none",
            width: "350px",
            height: "50px",
            margin: "2rem 2rem 1rem 2rem",
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="d-block p-3 input-sm"
          style={{
            borderRadius: "5px",
            border: "none",
            width: "350px",
            height: "50px",
            margin: "0rem 2rem 2rem 2rem",
          }}
        />
        <button
          className="fw-bold button button-sm"
          type="submit"
          onTouchEnd={() => {
            // Reset the style on mobile after click
            if (buttonRef.current) {
              buttonRef.current.style.backgroundColor = "rgb(198, 103, 103)";
              buttonRef.current.style.transform = "none";
            }
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
