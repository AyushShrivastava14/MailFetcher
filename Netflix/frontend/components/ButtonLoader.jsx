import React from "react";
import "./Loading.css";

export default function ButtonLoader() {
  return (
    <span className="pulse-loader-wrapper button-loader-wrapper m-auto">
      <span className="pulse-loader d-flex align-items-center">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </span>
    </span>
  );
} 