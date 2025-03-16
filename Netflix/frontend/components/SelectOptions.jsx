import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

export default function SelectOptions() {
    const navigate = useNavigate();
    const {saveSubject} = useRole();

  const changeSubject = async (subject) => {
    saveSubject(subject);
  };

  return (
    <>
      <div className="p-5 d-flex justify-content-center align-items-center flex-column">
        <button
          className="fw-bold search_button m-0"
          type="submit"
          onClick={() => {
            changeSubject("Netflix: Your sign-in code");
            navigate("/user/options/emailreader");
          }}
        >
          Sign-in Code
        </button>
        <button
          className="fw-bold search_button"
          style={{ margin: "2rem 0rem" }}
          type="submit"
        onClick={() => {
            changeSubject("Your temporary access code");
            navigate("/user/options/emailreader");
          }}
        >
          Household
        </button>
        <button
          className="fw-bold search_button m-0"
          type="submit"
        onClick={() => {
            changeSubject("Complete your password reset request");
            navigate("/user/options/emailreader");
          }}
        >
          Reset Link
        </button>
      </div>
    </>
  );
}
