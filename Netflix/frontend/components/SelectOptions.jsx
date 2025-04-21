import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

export default function SelectOptions() {
    const navigate = useNavigate();
    const {saveSubject, saveSubject2} = useRole();

  const changeSubject = async (subject) => {
    saveSubject(subject);
  };

  const changeSubject2 = async (subject) => {
    saveSubject2(subject);
  };

  return (
    <>
      <div className="p-5 d-flex justify-content-center align-items-center" style={{flexWrap: "wrap", marginBottom: "10.5rem"}}>
        <button
          className="fw-bold button mx-4 button-sm"
          type="submit"
          onClick={() => {
            changeSubject("Netflix: Your sign-in code");
            navigate("/user/options/emailreader");
          }}
        >
          Sign-in Code
        </button>
        <button
          className="fw-bold button mx-4 button-sm"
          style={{ margin: "2rem 0rem" }}
          type="submit"
        onClick={() => {
            changeSubject("Your temporary access code");
            changeSubject2("Important: How to update your Netflix Household");
            navigate("/user/options/emailreader");
          }}
        >
          Household
        </button>
        <button
          className="fw-bold button mx-4 button-sm"
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
