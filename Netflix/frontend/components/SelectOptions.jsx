import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";
import ButtonLoader from "./ButtonLoader";

export default function SelectOptions() {
    const navigate = useNavigate();
    const {saveSubject, saveSubject2} = useRole();
    const [loading, setLoading] = React.useState({ signIn: false, household: false, reset: false });

  const handleSignInClick = () => {
    setLoading({ signIn: true, household: false, reset: false });
    changeSubject("Netflix: Your sign-in code");
    changeSubject2(null);
    navigate("/options/code");
  };

  const handleHouseholdClick = () => {
    setLoading({ signIn: false, household: true, reset: false });
    changeSubject("Your temporary access code");
    changeSubject2("Important: how to update your Netflix household");
    navigate("/options/emailreader");
  };

  const handleResetClick = () => {
    setLoading({ signIn: false, household: false, reset: true });
    changeSubject("Complete your password reset request");
    changeSubject2(null);
    navigate("/options/emailreader");
  };

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
          onClick={handleSignInClick}
          disabled={loading.signIn}
        >
          {loading.signIn ? <ButtonLoader /> : "Sign-in Code"}
        </button>
        <button
          className="fw-bold button mx-4 button-sm"
          type="submit"
          style={{ margin: "2rem 0rem" }}
          onClick={handleHouseholdClick}
          disabled={loading.household}
        >
          {loading.household ? <ButtonLoader /> : "Household"}
        </button>
        <button
          className="fw-bold button mx-4 button-sm"
          type="submit"
          onClick={handleResetClick}
          disabled={loading.reset}
        >
          {loading.reset ? <ButtonLoader /> : "Reset Link"}
        </button>
      </div>
    </>
  );
}
