import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import carLogo from "../../assets/images/logo/logo4.png";

function Header({ scrollToBooking }) {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollPaths = ["/", "/tariff", "/ContactInfoPage"];

  useEffect(() => {
    if (scrollPaths.includes(location.pathname)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tariff", path: "/tariff" },
    { label: "Contact Us", path: "/ContactInfoPage" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;

      const percent = (scrollY / totalHeight) * 100;
      setProgress(percent);

      setScrolled(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNowClick = (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    navigate("/book");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#126839",
          color: "white",
          p: scrolled ? "2px 20px" : "2px 20px",
          transition: "padding 0.3s",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          {!isMobile && (
            <Grid
              item
              display="flex"
              alignItems="center"
              gap={1}
              paddingLeft={35}
            >
              <FaEnvelope style={{ color: "#FFF700" }} />
              <Typography variant="body2">
                ontimeonewaydroptaxi@gmail.com
              </Typography>
            </Grid>
          )}

          <Grid
            item
            display="flex"
            alignItems="center"
            gap={1}
            paddingRight={isMobile ? 0 : 30}
            sx={{ margin: isMobile ? "0 auto" : "0" }}
          >
            <FaPhoneAlt style={{ color: "#FFF700" }} />
            <Typography variant="body2">Phone: +91 9663150767</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "20px 10px" : "20px 10px",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: "63px",
          borderBottom: "1px solid #eee",
          transition: "padding 0.3s",
          padding: "0px 0px !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            transition: "0.3s",
            justifyContent: isMobile ? "flex-start" : "flex-start",
            paddingLeft: isMobile ? "45px" : scrolled ? "220px" : "200px",
          }}
        >
          <img
            src={carLogo}
            alt="Logo"
            style={{
              height: isMobile ? 73 : 76,
              objectFit: "contain",
              transition: "height 0.3s",
            }}
          />
        </Box>

        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              transition: "0.35s",
              transform: scrolled ? "translateX(-50px)" : "translateX(0px)",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: scrolled ? "16px" : "15px",
                  "&:hover": { color: "#126839" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {!isMobile ? (
          <Box
            sx={{
              display: scrolled ? "none" : "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
              paddingRight: "200px",
              opacity: scrolled ? 0 : 1,
              transition: "0.3s",
            }}
          >
            <Box
              component={Link}
              to="/book"
              onClick={handleBookNowClick}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 10px",
                height: "40px",
                borderRadius: "40px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                background:
                  "linear-gradient(90deg, hsl(44.66deg 99.11% 55.88%) 0%, hsla(132, 93%, 32%, 1.00) 100%)",
                border: "2px solid white",
                transition: "0.2s",
                "&:hover": { transform: "translateY(-3px)" },
              }}
            >
              BOOK NOW
              <span style={{ width: "28px", height: "20px", display: "flex" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "100%", height: "95%" }}
                >
                  <rect x="3" y="5" width="18" height="15" rx="3" ry="3" />
                  <path d="M16 3v4M8 3v4" />
                  <path d="M3 10h18" />
                </svg>
              </span>
            </Box>
          </Box>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          {/* Menu header with Cancel icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => {
                  setDrawerOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    style: { color: "#333", fontWeight: "bold" },
                  }}
                />
              </ListItem>
            ))}

            <ListItem
              onClick={(e) => {
                e.preventDefault();
                setDrawerOpen(false);
                navigate("/book");
              }}
            >
              {/* Keep Book Now button color different */}
              <ListItemText
                primary="Book Now"
                primaryTypographyProps={{
                  style: { color: "#126839", fontWeight: "bold" },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {progress > 0 && (
        <Box
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 25,
            width: 45,
            height: 45,
            borderRadius: "50%",
            backgroundColor: "#0e7e3f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            cursor: "pointer",
            zIndex: 9999,
            transition: "0.3s",
          }}
        >
          <svg width="45" height="45">
            <circle
              cx="22.5"
              cy="22.5"
              r="16"
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity="0.3"
            />

            <circle
              cx="22.5"
              cy="22.5"
              r="16"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={(2 * Math.PI * 16 * (100 - progress)) / 100}
              style={{ transition: "stroke-dashoffset 0.2s linear" }}
            />

            <path d="M22.5 14 L16 22 H29 Z" fill="white" />
          </svg>
        </Box>
      )}
    </>
  );
}

export default Header;
