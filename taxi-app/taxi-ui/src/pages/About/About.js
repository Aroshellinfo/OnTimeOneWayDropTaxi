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
        pt: { xs: 8, sm: 10, md: 12 },
        padding: { xs: 2, sm: 4 },
        paddingBottom: { xs: 4, md: 2 },
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
          justifyContent: { xs: "center", md: "flex-start" },
          gap: { md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            textAlign: "left",
            ml: { xs: 0, md: 24 },
            mb: { xs: 4, md: 0 },
            mt: 4,
          }}
        >
          <Link
            href=""
            underline="none"
            sx={{
              color: "#0e7e3fff",
              fontSize: { xs: 16, sm: 18, md: 20 },
              display: "inline-block",
              mb: 2,
            }}
          >
            {ABOUT_US_STRINGS.SECTION_TITLE}
          </Link>

          <Typography
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            {ABOUT_US_STRINGS.MAIN_HEADING}
          </Typography>

                <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1rem", md: "1rem" }, 
              color: "#333",
              mb: 3,
              lineHeight: 1.7,
              textAlign: "left", 
              whiteSpace: "pre-line", 
            }}
          >
            {ABOUT_US_STRINGS.BODY_TEXT}

            {ABOUT_US_STRINGS.BODY_TEXT0}

            {ABOUT_US_STRINGS.BODY_TEXT1}

            {ABOUT_US_STRINGS.BODY_TEXT2}

            {ABOUT_US_STRINGS.BODY_TEXT3}

            {ABOUT_US_STRINGS.BODY_TEXT4}
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
              padding: { xs: "12px 30px", md: "15px 45px" },
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={car}
            alt="carimg"
            sx={{
              maxWidth: "100%",
              width: { xs: "100%", sm: "90%", md: "600px" },
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
