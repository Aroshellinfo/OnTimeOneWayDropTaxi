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
          alignItems: "center",
          fontWeight: "bold",
          width: "100%",
          height: "38px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#126839",
            color: "white",
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            whiteSpace: "nowrap",
            width: "280px",
            fontSize: "16px",
          }}
        >
         {HERO_TEXT.HOT_OFFERS_TITLE}
        </Box>

        <Box
          sx={{
            backgroundColor: "#E6F6F0",
            color: "Black",
            flex: 1,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            height: "100%",
            px: 1,
          }}
        >
          <marquee
            style={{
              fontSize: "18px",
              lineHeight: "45px",
            }}
          >
            {TAXI_OFFERS.join(" — ")}
          </marquee>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
            sx={{
              backgroundImage: `url(${taxiImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              py: 6,
              px: { xs: "10px", sm: "70px", md: "220px" },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "1.5fr 1fr",
              },
              gap: 4,
              alignItems: "center",
              color: "#000000ff",
              height: { xs: "300px", sm: "350px", md: "380px" }, 
            }}
          >

        {/* TEXT */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <strong>
              {HERO_TEXT.SERVICE_DESCRIPTION1} <br />
              {HERO_TEXT.SERVICE_DESCRIPTION2}<br />
              {HERO_TEXT.SERVICE_DESCRIPTION3}
            </strong>
          </Typography>

          <Typography
            sx={{
              color: "#126839",
              fontWeight: "bold",
              fontSize: 28,
              mb: 1,
            }}
          >
            {HERO_TEXT.PRICE_HEADLINE_PART1} <br />
            {HERO_TEXT.PRICE_HEADLINE_PART2}
          </Typography>

          <Typography sx={{ fontSize: 14, mb: 3 }}>
            {HERO_TEXT.CALL_TO_ACTION}
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* CALL NOW */}
            <Button
              sx={{
                backgroundColor: "#126839",
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: "6px",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: "#126839",
                  color: "white",
                },
              }}
              href="tel:+919663150767"
            >
              {HERO_TEXT.CALL_BUTTON}
              <CallIcon sx={{ color: "white", fontSize: 22 }} />
            </Button>

            {/* BOOK NOW — SCROLL TO BOOKING */}
            <Button
              onClick={scrollToBooking}
              className="book-now-btn"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "6px",
                fontWeight: "bold",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "2px solid #126839",
                backgroundColor: "transparent",
                color: "#000",
                position: "relative",
                overflow: "hidden",
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
