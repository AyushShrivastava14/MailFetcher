import React, { useState } from "react";
import { useRole } from "../context/Context";
import "./Options.css";
import ButtonLoader from "./ButtonLoader";

export default function Options() {
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState({
    addAccess: false,
    removeAccess: false,
    codesAccess: false,
    addSignIn: false,
    removeSignIn: false,
    codesSignIn: false
  });
  const { url } = useRole();

  const fetchAccessCodes = async () => {
    setLoading(l => ({ ...l, codesAccess: true }));
    const response = await fetch(url + "/access-codes");
    const data = await response.json();
    // console.log(data);
    alert(data);
    setLoading(l => ({ ...l, codesAccess: false }));
  };

  const addAccessCode = async () => {
    setLoading(l => ({ ...l, addAccess: true }));
    const response = await fetch(url + "/access-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
    setLoading(l => ({ ...l, addAccess: false }));
  };

  const removeAccessCode = async () => {
    setLoading(l => ({ ...l, removeAccess: true }));
    const response = await fetch(url + "/access-codes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
    setLoading(l => ({ ...l, removeAccess: false }));
  };


  // For SIGN-IN Codes
  const fetchSignInCodes = async () => {
    setLoading(l => ({ ...l, codesSignIn: true }));
    const response = await fetch(url + "/signincodes");
    const data = await response.json();
    // console.log(data);
    alert(data);
    setLoading(l => ({ ...l, codesSignIn: false }));
  };

  const addSignInCode = async () => {
    setLoading(l => ({ ...l, addSignIn: true }));
    const response = await fetch(url + "/signincodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
    setLoading(l => ({ ...l, addSignIn: false }));
  };

  const removeSignInCode = async () => {
    setLoading(l => ({ ...l, removeSignIn: true }));
    const response = await fetch(url + "/signincodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inputCode }),
    });
    const data = await response.json();
    alert(data.message);
    setInputCode("");
    setLoading(l => ({ ...l, removeSignIn: false }));
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
            disabled={loading.addAccess}
          >
            {loading.addAccess ? <ButtonLoader /> : "Add"}
          </button>
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={removeAccessCode}
            disabled={loading.removeAccess}
          >
            {loading.removeAccess ? <ButtonLoader /> : "Remove"}
          </button>
          <button
            className="fw-bold button m-0 admin-button-sm"
            type="button"
            onClick={fetchAccessCodes}
            disabled={loading.codesAccess}
          >
            {loading.codesAccess ? <ButtonLoader /> : "Codes"}
          </button>
        </div>
        <div className="me-auto mt-4 mb-3" style={{color: "white"}}><h3 className="fw-bold">For Sign-In Codes</h3></div>
        <div className="d-flex mb-4 justify-content-between w-100">
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={addSignInCode}
            disabled={loading.addSignIn}
          >
            {loading.addSignIn ? <ButtonLoader /> : "Add"}
          </button>
          <button
            className="fw-bold button admin-button-sm"
            type="button"
            onClick={removeSignInCode}
            disabled={loading.removeSignIn}
          >
            {loading.removeSignIn ? <ButtonLoader /> : "Remove"}
          </button>
          <button
            className="fw-bold button m-0 admin-button-sm"
            type="button"
            onClick={fetchSignInCodes}
            disabled={loading.codesSignIn}
          >
            {loading.codesSignIn ? <ButtonLoader /> : "Codes"}
          </button>
        </div>
      </form>
    </div>
  );
}