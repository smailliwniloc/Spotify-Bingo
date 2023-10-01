import React from "react";
import { BLACK, GREEN } from "../constants/COLORS";

function Footer() {
  return (
    <div
      style={{
        width: "100%",
        height: "120px",
        color: "white",
        background: `linear-gradient(270deg, ${BLACK.hex}, ${GREEN.hex})`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      Footer
    </div>
  );
}

export default Footer;
