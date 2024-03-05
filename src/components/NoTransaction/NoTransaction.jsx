
import React from "react";

import "./NoTransaction.css"
function NoTransaction() {
  return (
    <div
      className="NoTransaction"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div className="image-holder">
        <img
          style={{
            width: "400px",
          }}
          src="https://cdni.iconscout.com/illustration/premium/thumb/payment-unsuccessful-4790938-3989291.png"
        ></img>
      </div>
      <p
        style={{
          opacity: 1.5,
          color: "rgb(138 138 138 / 75%)",
          fontFamily: "var(--defaultFont)",
          fontSize: "2rem",
          fontWeight: "500",
        }}
      >
        No transactions added
      </p>
    </div>
  );
}

export default NoTransaction;
