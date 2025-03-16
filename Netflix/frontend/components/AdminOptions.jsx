import React, { useState } from 'react';
// import { useAccessCode } from '../context/AccessCodeContext';

export default function AdminOptions() {
    const [inputCode, setInputCode] = useState('');

    const fetchAccessCodes = async () => {
        const response = await fetch('http://127.0.0.1:5000/access-codes');
        const data = await response.json();
        // console.log(data);
        alert(data);
    };

    const addAccessCode = async () => {
        const response = await fetch('http://127.0.0.1:5000/access-codes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: inputCode })
        });
        const data = await response.json();
        alert(data.message);
        setInputCode('');
    };

    const removeAccessCode = async () => {
        const response = await fetch('http://127.0.0.1:5000/access-codes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: inputCode })
        });
        const data = await response.json();
        alert(data.message);
        setInputCode('');
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
                margin: "0 auto", // Center the form
            }}
        >
            <h1
                className="fw-bold mb-4 d-flex justify-content-center"
                style={{ color: "white" }}
            >
                Manage Access Codes
            </h1>
            <form
                // className="d-flex flex-column align-items-center"
            >
                <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter Access Codes to Add/Remove"
                    required
                    className="d-block p-3"
                    style={{
                        borderRadius: "5px",
                        border: "none",
                        borderStyle: "none",
                        width: "550px",
                        height: "50px",
                        margin: "2rem",
                    }}
                />
                <button
                    className="fw-bold search_button"
                    type="button"
                    onClick={addAccessCode}
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
                    Add
                </button>
                <button
                    className="fw-bold search_button"
                    type="button"
                    onClick={removeAccessCode}
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
                    Remove
                </button>
                <button
                    className="fw-bold search_button m-0"
                    type="button"
                    onClick={fetchAccessCodes}
                    style={{
                        borderRadius: "5px",
                        border: "none",
                        borderStyle: "none",
                        width: "250px",
                        height: "50px",
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Show all Access Codes
                </button>
            </form>
        </div>
    );
}