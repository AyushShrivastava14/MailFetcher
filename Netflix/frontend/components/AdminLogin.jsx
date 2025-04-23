import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import Loading from "./Loading";

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPass = import.meta.env.VITE_ADMIN_PASS;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveRole } = useRole();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      if (email === adminEmail && password === adminPass) {
        await saveRole("admin");
        navigate("/admin/managecodes");
      } else {
        setTimeout(() => {
          alert("Invalid email or password");
        }, 100);
      }
      setLoading(false);
    }, 0);
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
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Loading />
        </div>
      ) : (
        <>
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
              style={{
                borderRadius: "5px",
                border: "none",
                width: "150px",
                height: "50px",
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </>
      )}
    </div>
  );
}
