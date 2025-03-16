import React from "react";
import telegram from "../public/telegram.webp";

export default function HomePage() {
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
        <img src={telegram} alt="..." height={"50px"} width={"50px"} />
        <h1 style={{ marginLeft: "1.5rem", letterSpacing: "0.5rem" }}>Anand</h1>
      </div>
    </>
  );
}
