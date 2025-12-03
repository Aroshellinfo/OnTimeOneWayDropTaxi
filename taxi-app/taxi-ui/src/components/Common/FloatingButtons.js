import React from "react";
import { IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Button - Bottom Left */}
      <IconButton
          onClick={() => window.open("https://wa.me/919663150767", "_blank")}
          sx={{
            position: "fixed",
            bottom: 20,   
            left: 20,
            background: "#25D366",
            color: "white",
            width: 55,
            height: 55,
            zIndex: 3000,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            "&:hover": { background: "#1EBE5B" }
          }}
        >
        <WhatsAppIcon sx={{ fontSize: 30 }} />
    </IconButton>

      <IconButton
        onClick={() => window.location.href = "tel:+919663150767"}
        sx={{
          position: "fixed",
          bottom: 20,   
          right: 20,
          background: "#007bff",
          color: "white",
          width: 55,
          height: 55,
          zIndex: 3000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          "&:hover": { background: "#0057d1" }
        }}
      >
        <CallIcon sx={{ fontSize: 30 }} />
      </IconButton>

    </>
  );
}
