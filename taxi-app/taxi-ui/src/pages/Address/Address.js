import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImage from "./taxi2.jpg"; // replace with your uploaded image

function Address() {
  const navigate = useNavigate();

  const offers = [
    "Chennai to Pondicherry Rs. 2199/-",
    "Chennai to Bangalore Rs. 5599/-",
    "Chennai to Madurai Rs. 6499/-"
  ];

  return (
    <>
      {/* Hot Offers Section */}
      <Box sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
        <Box
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            p: "22px 10%",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center"
          }}
        >
          Hot Offers
        </Box>
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            p: "20px 0"
          }}
        >
          <marquee>{offers.join("   ✦   ")}</marquee>
        </Box>
      </Box>

      {/* Main Section */}
      <Box sx={{ backgroundColor: "#fff5f5", p: "40px 20px" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side text */}
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: 18,
                mb: 2,
                lineHeight: 1.6,
                fontWeight: "bold",
                textDecoration: "underline"
              }}
            >
              Affordable 24/7 taxi service anywhere in and around Tamilnadu, Kerala, Pondicherry and nearby States.
            </Typography>

            <Typography
              sx={{
                color: "#d32f2f",
                fontWeight: "bold",
                fontSize: 32,
                mb: 2,
                lineHeight: 1.4
              }}
            >
              ONE WAY DROP TAXI @ RS.13/KM ONWARDS
            </Typography>

            <Typography sx={{ fontSize: 14, mb: 4 }}>
              Need a ride? just call or WhatsApp
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                Call Now
              </Button>
              <Button
                onClick={() => navigate("/car-taxi-booking")}
                sx={{
                  backgroundColor: "transparent",
                  color: "#000",
                  border: "2px solid #d32f2f",
                  px: 4,
                  py: 1.5,
                  borderRadius: "6px",
                  fontWeight: "bold"
                }}
              >
                Book Now
              </Button>
            </Box>
          </Grid>

          {/* Right side image */}
          <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
            <img
              src={heroImage}
              alt="Travel illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Address;

