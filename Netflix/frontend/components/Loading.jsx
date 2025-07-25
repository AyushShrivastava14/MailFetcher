import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "75vh" }}
      >
        <div className="pulse-loader-wrapper">
          <div className="pulse-loader mb-4">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      </div>
    </>
  );
}
