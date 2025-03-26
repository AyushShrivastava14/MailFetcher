import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPass = import.meta.env.VITE_ADMIN_PASS;

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {saveRole} = useRole();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === adminEmail && password === adminPass) {
            // Login successful
            saveRole('admin');
            alert('Login successful!');
            navigate("/admin/managecodes");
        } else {
            // Login failed
            alert('Invalid email or password');
        }
    };

    return (
        <>
            <div
                className="p-5"
                style={{
                    width: "fit-content",
                    backgroundColor: "black",
                    opacity: "0.85",
                    border: "3px solid red",
                    borderRadius: "10px",
                    margin: "0 auto", // Center the form
                }}
            >
                <h1
                    className="fw-bold mb-4 d-flex justify-content-center"
                    style={{ color: "white" }}
                >
                    Enter Email
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
                        className="d-block p-3"
                        style={{
                            borderRadius: "5px",
                            border: "none",
                            borderStyle: "none",
                            width: "350px",
                            height: "50px",
                            margin: "2rem",
                        }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="d-block p-3"
                        style={{
                            borderRadius: "5px",
                            border: "none",
                            borderStyle: "none",
                            width: "350px",
                            height: "50px",
                            margin: "0rem 2rem 2rem 2rem",
                        }}
                    />
                    <button
                        className="fw-bold search_button"
                        type="submit"
                        style={{
                            borderRadius: "5px",
                            border: "none",
                            borderStyle: "none",
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
            </div>
        </>
    );
}
