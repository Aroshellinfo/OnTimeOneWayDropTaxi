// src/components/Booking/DropTaxi.jsx
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import carimage1 from "../../assets/images/taxis/droptaxi.png";
import { DROP_TAXI_CONTENT, DROP_TAXI_BOX_ITEMS } from "../../constants/dropTaxiData";

const DropTaxi = ({ scrollToBooking, scrollToTariff, scrollToRoutes }) => {

  const handleBookNowClick = () => {
    if (typeof scrollToBooking === "function") {
      scrollToBooking();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const safeRun = (fn) => {
    if (typeof fn === "function") {
      fn();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollMap = {
    booking: scrollToBooking,
    tariff: scrollToTariff,
    routes: scrollToRoutes,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: "auto", md: "100vh" },
        py: { xs: 6, md: 0 },
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: "center", md: "flex-end" },
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={carimage1}
        alt="backgimg"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            width: { xs: "100%", sm: "85%", md: "60%" },
            ml: "auto",
            textAlign: { xs: "center", md: "right" },
            pr: { xs: 0, md: "120px" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "26px", sm: "30px", md: "32px" },
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            {DROP_TAXI_CONTENT.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            {DROP_TAXI_CONTENT.description.map((line, i) => (
              <span key={i}>
                {line} <br />
              </span>
            ))}
          </Typography>
          <Button
            variant="contained"
            onClick={handleBookNowClick}
            sx={{
              backgroundColor: '#126839',
              fontWeight: 'bold',
              px: { xs: 3, md: 4 },
              py: 1.5,
              borderRadius: 1,
              mb: { xs: 4, md: 8 },
              '&:hover': {
                backgroundColor: '#ffcb05',
                color: 'black',
              },
            }}
          >
            Book Now
          </Button>
        </Box>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: { xs: 2, md: 4 } }}
        >
          {DROP_TAXI_BOX_ITEMS.map((item) => (
            <Grid item xs={12} sm={6} md="auto" key={item.id}>
              <Box
                onClick={() => safeRun(scrollMap[item.key])}
                sx={boxStyle}
              >
                <strong>{item.id}</strong> {item.label}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const boxStyle = {
  backgroundColor: "rgba(255,255,255,0.1)",
  padding: "20px 40px",
  borderRadius: "20px 0 20px 0",
  fontSize: { xs: "18px", sm: "20px", md: "22px" },
  fontWeight: "bold",
  color: "white",
  cursor: "pointer",
  transition: "0.3s",
  textAlign: "center",
  minWidth: { xs: "100%", sm: "200px" },
  "&:hover": {
    backgroundColor: "#126839",
    transform: "translateY(-8px)",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.4)",
  },
};

export default DropTaxi;