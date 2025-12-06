/* src/components/Common/BottomNavBar.jsx */
import React, { useState, useEffect } from "react";
import { Box, IconButton, Button, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const BottomNavBar = ({
  scrollTop,
  scrollAbout,
  scrollServices,
  scrollWhy,
  scrollRoutes,
  scrollContact,
}) => {
  const [open, setOpen] = useState(false);
  const [showOnScroll, setShowOnScroll] = useState(false);
  const [permanentlyClosed, setPermanentlyClosed] = useState(false);

  // Detect mobile screen
  const isMobile = useMediaQuery("(max-width: 768px)");

  const runSafe = (fn) => {
    if (typeof fn === "function") {
      fn();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navActions = [
    { label: "Home", action: scrollTop },
    { label: "About", action: scrollAbout },
    { label: "Service", action: scrollServices },
    { label: "Why?", action: scrollWhy },
    { label: "Tariff", action: scrollContact },
    { label: "Routes", action: scrollRoutes },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (permanentlyClosed) return;

      if (window.scrollY > 200) {
        setShowOnScroll(true);
        setOpen(true);
      } else {
        setShowOnScroll(false);
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [permanentlyClosed]);

  // ❌ Correct place to hide on mobile (after hooks)
  if (isMobile) return null;

  if (!showOnScroll || permanentlyClosed) return null;

  return (
    <>
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 25,
            right: 20,
            background: "#126839",
            color: "#fff",
            zIndex: 2000,
            "&:hover": { background: "#126839" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            borderRadius: "25px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            px: 2,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            zIndex: 2000,
          }}
        >
          {navActions.map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                setOpen(false);
                runSafe(item.action);
              }}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "18px",
                color: "#444",
                "&:hover": { background: "#f5f5f5" },
              }}
            >
              {item.label}
            </Button>
          ))}

          <IconButton
            onClick={() => {
              setPermanentlyClosed(true);
              setOpen(false);
            }}
            sx={{
              background: "#126839",
              color: "#fff",
              width: 28,
              height: 28,
              "&:hover": { background: "#126839" },
            }}
          >
            <CloseIcon sx={{ fontSize: "18px" }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default BottomNavBar;
