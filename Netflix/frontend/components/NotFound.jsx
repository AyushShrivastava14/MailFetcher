import React from "react";

export default function NotFound() {
  return (
    <>
      <div
        className="p-4 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <h1 style={{ letterSpacing: "0.5rem" }}>Not Found/Accessible</h1>
      </div>
    </>
  );
}
