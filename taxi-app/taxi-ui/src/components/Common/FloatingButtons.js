import React from "react";
import { IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Button - Bottom Left */}
      <IconButton
        onClick={() =>
          window.open(
            "https://wa.me/919663150767?text=Hi%20I%20need%20a%20cab%20booking",
            "_blank"
          )
        }
        sx={{
          position: "fixed",
          // Positioning: 10px from edge for mobile, 20px for desktop
          bottom: { xs: 10, sm: 20 },
          left: { xs: 10, sm: 20 },
          background: "#25D366",
          color: "white",
          // Size: 50px for mobile, 55px for desktop
          width: { xs: 50, sm: 55 },
          height: { xs: 50, sm: 55 },
          zIndex: 3000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          "&:hover": { background: "#1EBE5B" },
        }}
      >
        {/* Icon size should also shrink slightly */}
        <WhatsAppIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
      </IconButton>

      {/* Call Button - Bottom Right */}
      <IconButton
        onClick={() => (window.location.href = "tel:+919663150767")}
        sx={{
          position: "fixed",
          // Positioning: 10px from edge for mobile, 20px for desktop
          bottom: { xs: 10, sm: 20 },
          right: { xs: 10, sm: 20 },
          background: "#007bff",
          color: "white",
          // Size: 50px for mobile, 55px for desktop
          width: { xs: 50, sm: 55 },
          height: { xs: 50, sm: 55 },
          zIndex: 3000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          "&:hover": { background: "#0057d1" },
        }}
      >
        {/* Icon size should also shrink slightly */}
        <CallIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
      </IconButton>
    </>
  );
}