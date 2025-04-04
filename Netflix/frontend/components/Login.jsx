import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRole } from '../context/RoleContext';

export default function Login() {
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState('');
    const {saveRole, url} = useRole();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(url + '/access-codes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const validAccessCodes = await response.json();

            if (validAccessCodes.includes(inputCode)) {
                saveRole('user');
                alert('Access code is valid');
                navigate('/user/options');
            } else {
                alert('Invalid access code.');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div
            className="p-5"
            style={{
                width: "fit-content",
                backgroundColor: "black",
                opacity: "0.85",
                border: "3px solid red",
                borderRadius: "10px",
            }}
        >
            <h1
                className="fw-bold mb-4 d-flex justify-content-center"
                style={{ color: "white" }}
            >
                Enter Access Code
            </h1>
            <form
                className="d-flex justify-content-center align-items-center"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Access Code"
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
                <button className="fw-bold search_button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
