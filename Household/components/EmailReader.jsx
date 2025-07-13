import React, { useState } from "react";
import axios from "axios";
import "./EmailReader.css";
import { useRole } from "../context/RoleContext";
import ButtonLoader from "./ButtonLoader";

function EmailReader() {
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const { url } = useRole();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(url + "/get_last_email", {
        params: { search: searchString, subject: "Your temporary access code", subject2: "Important: how to update your Netflix household" },
      });
      setEmailData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setEmailData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        width: "fit-content",
        height: "100vh",
        opacity: "0.85",
        marginBottom: emailData ? "0rem" : "10.5rem",
        boxSizing: "border-box"
      }}
    >
      <h1
        className="fw-bold mb-3 d-flex justify-content-center heading-sm"
        style={{ color: "white" }}
      >
        Enter Email
      </h1>
      <p className="d-flex justify-content-center m-0">
        <span className="para-sm" style={{ color: "white" }}>
          Please wait for the response
        </span>
      </p>
      <form
        className="d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Email"
          required
          className="d-block p-3 input-sm"
          style={{
            borderRadius: "5px",
            border: "none",
            borderStyle: "none",
            width: "350px",
            height: "50px",
            margin: "2rem 0.7rem",
          }}
        />
        <button
          className="fw-bold button button-sm m-0"
          type="submit"
        >
          {loading ? <ButtonLoader /> : "Search"}
        </button>
      </form>
      {error && (
        <div
          className="d-flex justify-content-center mt-3"
          style={{ color: "white" }}
        >
          Not Found or Invalid Input
        </div>
      )}
      {!emailData && !error}
      {emailData && (
        <div
          className="m-4 p-2 d-flex flex-column align-items-center"
          style={{ color: "white", textAlign: "justify" }}
        >
          <h2 className="mb-4 mt-2" style={{fontStyle: "italic"}}>Fetched Code / Link</h2>
          {emailData.Link ? <a className="responsive-details" href={emailData.Content} target="_blank" >Click Here</a> : <p className="responsive-details" >Code: {emailData.Content}</p>}
        </div>
      )}
    </div>
  );
}

export default EmailReader;
