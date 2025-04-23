import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRole } from '../context/RoleContext';
import "./EmailReader.css"
import Loading from './Loading';

export default function Login() {
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState('');
    const {saveRole, url} = useRole();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(url + '/access-codes');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const validAccessCodes = await response.json();
    
            setTimeout(() => {
                if (validAccessCodes.includes(inputCode)) {
                    await saveRole('user');
                    navigate('/user/options');
                } else {
                    setTimeout(() => {
                        alert("Invalid Access Code");
                    }, 100); 
                }
                setLoading(false);
            }, 2000); 
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    

    return (
        <div
            className="p-5"
            style={{
                width: "fit-content",
                opacity: "0.85",
                marginBottom: "9.5rem"
            }}
        >
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <Loading />
                </div>
            ) : (
                <>
                    <h1 className="fw-bold mb-4 d-flex justify-content-center heading-sm" style={{ color: "white" }}>
                        Welcome to Netflix Manager
                    </h1>
                    <p className='d-flex justify-content-center m-0'>
                        <span className="para-sm" style={{color: "white"}}>
                            Please enter access code to use the services
                        </span>
                    </p>
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
                            className="d-block p-3 input-sm"
                            style={{
                                borderRadius: "5px",
                                border: "none",
                                width: "350px",
                                height: "50px",
                                margin: "2rem 0.7rem",
                            }}
                        />
                        <button className="fw-bold button button-sm" type="submit">
                            Submit
                        </button>
                    </form>
                </>
            )}
        </div>
    );    
}
