import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <>
      <div className="pulse-loader-wrapper">
      <div className="pulse-loader mb-4">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <h5 className="loader-text">Please Wait...</h5>
    </div>
    </>
  );
}
