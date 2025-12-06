import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function FloatingButtons() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 700);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes zoomShake {
          0% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(1.2) rotate(-2deg); }
          60% { transform: scale(1.2) rotate(2deg); }
          80% { transform: scale(1.2) rotate(-2deg); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* WhatsApp Button */}
      <IconButton
        onClick={() => window.open("https://wa.me/919663150767", "_blank")}
        sx={{
          position: "fixed",
          bottom: { xs: 15, sm: 20 },       // mobile responsive
          left: { xs: 15, sm: 20 },         // mobile responsive
          background: "#25D366",
          color: "white",
          width: { xs: 48, sm: 55 },        // mobile size
          height: { xs: 48, sm: 55 },       // mobile size
          zIndex: 3000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          animation: animate ? "zoomShake 0.7s ease-in-out" : "none",
          "&:hover": { background: "#1EBE5B" }
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
      </IconButton>

      {/* Call Button */}
      <IconButton
        onClick={() => (window.location.href = "tel:+919663150767")}
        sx={{
          position: "fixed",
          bottom: { xs: 15, sm: 20 },       // mobile responsive
          right: { xs: 15, sm: 20 },        // mobile responsive
          background: "#007bff",
          color: "white",
          width: { xs: 48, sm: 55 },        // mobile
          height: { xs: 48, sm: 55 },       // mobile
          zIndex: 3000,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          animation: animate ? "zoomShake 0.7s ease-in-out" : "none",
          "&:hover": { background: "#0057d1" }
        }}
      >
        <CallIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
      </IconButton>
    </>
  );
}
