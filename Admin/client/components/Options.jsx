import React, { useState } from "react";
import { useRole } from "../context/Context";
import "./Options.css";

export default function Options() {
  const [inputCode, setInputCode] = useState("");
  const { url } = useRole();

  const fetchAccessCodes = async () => {
    const response = await fetch(url + "/access-codes");
    const data = await response.json();
    // console.log(data);
    alert(data);
  };

  const addAccessCode = async () => {
    const response = await fetch(url + "/access-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
  };

  const removeAccessCode = async () => {
    const response = await fetch(url + "/access-codes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
  };


  // For SIGN-IN Codes
  const fetchSignInCodes = async () => {
    const response = await fetch(url + "/signincodes");
    const data = await response.json();
    // console.log(data);
    alert(data);
  };

  const addSignInCode = async () => {
    const response = await fetch(url + "/signincodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
  };

  const removeSignInCode = async () => {
    const response = await fetch(url + "/signincodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
  };

  return (
    <div
      className="p-5"
      style={{
        width: "fit-content",
        opacity: "0.85",
        marginBottom: "11rem", // Center the form
      }}
    >
      <h1
        className="fw-bold mb-2 d-flex justify-content-center"
        style={{ color: "white" }}
      >
        Manage Access Codes
      </h1>
      <form className="d-flex flex-column align-items-center">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Enter Access Codes to Add/Remove"
          required
          className="d-block p-3 input-sm"
          style={{
            borderRadius: "5px",
            border: "none",
            borderStyle: "none",
            width: "550px",
            height: "50px",
            margin: "2rem",
          }}
        />
        <div className="d-flex mb-4 justify-content-between w-100">
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={addAccessCode}
          >
            Add
          </button>
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={removeAccessCode}
          >
            Remove
          </button>
          <button
            className="fw-bold button m-0 admin-button-sm"
            type="button"
            onClick={fetchAccessCodes}
          >
            Codes
          </button>
        </div>
        <div className="me-auto mt-4 mb-3" style={{color: "white"}}><h3 className="fw-bold">For Sign-In Codes</h3></div>
        <div className="d-flex mb-4 justify-content-between w-100">
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={addSignInCode}
          >
            Add
          </button>
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={removeSignInCode}
          >
            Remove
          </button>
          <button
            className="fw-bold button m-0 admin-button-sm"
            type="button"
            onClick={fetchSignInCodes}
          >
            Codes
          </button>
        </div>
      </form>
    </div>
  );
}