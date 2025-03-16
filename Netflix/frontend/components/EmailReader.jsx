import React, { useState } from "react";
import axios from "axios";
import "./EmailReader.css";
import { useRole } from "../context/RoleContext";

function EmailReader() {
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");
  const {subject} = useRole();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://127.0.0.1:5000/get_last_email", {
        params: { search: searchString, subject: subject },
      });
      setEmailData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEmailData(null);
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
        Enter Email
      </h1>
      <form
        className="d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Enter search string"
          required
          className="d-block p-3"
          style={{
            borderRadius: "5px",
            border: "none",
            borderStyle: "none",
            width: "250px",
            height: "50px",
            margin: "2rem",
          }}
        />
        <button className="fw-bold search_button" type="submit">
          Search
        </button>
      </form>
      {error && <div style={{ color: "white" }}>Error: {error}</div>}
      {!emailData && !error}
      {emailData && (
        <div className="m-4 p-2" style={{ color: "white", textAlign: "justify" }}>
          <h2>Content :-</h2>
          <p style={{width: "600px", wordWrap: "break-word", overflowWrap: "break-word"}}>{emailData.Content}</p>
        </div>
      )}
    </div>
  );
}

export default EmailReader;