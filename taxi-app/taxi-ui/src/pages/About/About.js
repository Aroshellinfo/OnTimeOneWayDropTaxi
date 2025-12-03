import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ABOUT_US_STRINGS } from "../../constants/AboutUs_string";
import car from "../../assets/images/cars/car17.png";


const AboutUs = ({ scrollToBooking }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (typeof scrollToBooking === "function") {
      scrollToBooking();
    } else {
      navigate("/book");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        paddingTop: "0px !important",
        paddingBottom: "0px !important",
        p: 10.5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1300px",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            textAlign: "left",
            ml: { md: 4 },
          }}
        >
          <Link
            href=""
            underline="none"
            sx={{
              color: "#0e7e3fff",
              fontSize: 20,
              display: "inline-block",
              mb: 2,
            }}
          >
            {ABOUT_US_STRINGS.SECTION_TITLE}
          </Link>

          <Typography variant="h3" component="h1" gutterBottom>
            {ABOUT_US_STRINGS.MAIN_HEADING}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: 15,
              color: "#333",
              mb: 3,
              whiteSpace: "pre-line",
              lineHeight: 1.7,
            }}
          >
            {ABOUT_US_STRINGS.BODY_TEXT}<br/>
            {ABOUT_US_STRINGS.BODY_TEXT0}<br />
            {ABOUT_US_STRINGS.BODY_TEXT1}<br />
            {ABOUT_US_STRINGS.BODY_TEXT2}<br />
            {ABOUT_US_STRINGS.BODY_TEXT3}<br />
            {ABOUT_US_STRINGS.BODY_TEXT4}<br />
          </Typography>

          <Button
            onClick={handleBookNow}
            sx={{
              backgroundImage:
                "linear-gradient(to right, #16A085 0%, #F4D03F 51%, #16A085 100%)",
              backgroundSize: "200% auto",
              color: "white",
              boxShadow: "0 0 20px #eee",
              borderRadius: "10px",
              padding: "15px 45px",
              textTransform: "uppercase",
              transition: "0.5s",
              "&:hover": {
                backgroundPosition: "right center",
                color: "#fff",
                textDecoration: "none",
              },
            }}
          >
            {ABOUT_US_STRINGS.BOOK_NOW_BUTTON}
          </Button>
        </Box>

        {/* Right Image */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={car}
            alt="carimg"
            sx={{
              maxWidth: "100%",
              width: { xs: "90%", md: "600px" },
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;