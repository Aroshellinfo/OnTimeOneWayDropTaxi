import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import taxiImage from "../../assets/images/travelers/img4.png";
import "./HeroButton.css";
import { TAXI_OFFERS, HERO_TEXT } from "../../constants/HeroString";

export default function HeroSection({ scrollToBooking }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          fontWeight: "bold",
        }}
      >
        <Box
  sx={{
    backgroundColor: "#126839",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "38px",
    // Set responsive width: 100px for mobile, 30% for desktop
    width: { xs: "100%", md: "30%" },
    whiteSpace: "nowrap",
    fontSize: { xs: "14px", sm: "16px" },
  }}
>
  {HERO_TEXT.HOT_OFFERS_TITLE}
</Box>


        <Box
          sx={{
            backgroundColor: "#E6F6F0",
            color: "Black",
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            height: "38px",
            px: 1,
          }}
        >
          <marquee
            style={{
              fontSize: "16px",
              lineHeight: "38px",
            }}
          >
            {TAXI_OFFERS.join(" — ")}
          </marquee>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundImage: `url(${taxiImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          py: { xs: 3, sm: 6 },
          px: { xs: "15px", sm: "70px", md: "220px" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "1.5fr 1fr" },
          gap: 4,
          alignItems: "center",
          color: "#000",
          height: { xs: "auto", sm: "450px", md: "480px" },
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontSize: { xs: "15px", sm: "22px" }, lineHeight: 1.4 }}
          >
            <strong>
              {HERO_TEXT.SERVICE_DESCRIPTION1} <br />
              {HERO_TEXT.SERVICE_DESCRIPTION2} <br />
              {HERO_TEXT.SERVICE_DESCRIPTION3}
            </strong>
          </Typography>

          <Typography
            sx={{ color: "#126839", fontWeight: "bold", fontSize: { xs: 20, sm: 28 }, mb: 1, lineHeight: 1.2 }}
          >
            {HERO_TEXT.PRICE_HEADLINE_PART1} <br />
            {HERO_TEXT.PRICE_HEADLINE_PART2}
          </Typography>

          <Typography sx={{ fontSize: { xs: 12, sm: 14 }, mb: 3 }}>
            {HERO_TEXT.CALL_TO_ACTION}
          </Typography>

          <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#126839",
                  color: "white",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  borderRadius: "6px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  width: { xs: "50%", sm: "auto" },
                  "&:hover": {
                    backgroundColor: "#126839",
                  },
                }}
                href="tel:+919663150767"
              >
                {HERO_TEXT.CALL_BUTTON}
                <CallIcon sx={{ color: "white", fontSize: 22 }} />
              </Button>

              <Button
                onClick={scrollToBooking}
                className="book-now-btn"
                sx={{
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  borderRadius: "6px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  border: "2px solid #126839",
                  backgroundColor: "transparent",
                  color: "#000",
                  width: { xs: "50%", sm: "auto" },
                }}
              >
                <span className="btn-text">{HERO_TEXT.BOOK_BUTTON}</span>
                <span style={{ width: "24px", height: "24px", display: "flex" }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "100%", height: "100%", color: "black" }}
                  >
                    <rect x="3" y="5" width="18" height="15" rx="3" ry="3" />
                    <path d="M16 3v4M8 3v4" />
                    <path d="M3 10h18" />
                  </svg>
                </span>
              </Button>
            </Box>

        </Box>
      </Box>
    </>
  );
}
