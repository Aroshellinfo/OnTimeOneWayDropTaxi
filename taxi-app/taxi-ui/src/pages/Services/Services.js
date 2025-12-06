import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import { SERVICES_DATA } from "../../constants/Services_string";
import { SERVICES_STRINGS } from "../../constants/Services_string";

const Services = ({ scrollToBooking }) => {

  const handleBookNowClick = () => {
    if (scrollToBooking) scrollToBooking();
  };

  return (
    <Box sx={{ background: '#ddeedeff', padding: { xs: '0px 20px', md: '90px' } }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'green',
            fontWeight: 900,
            mb: 3,
            fontSize: 20,
            textDecoration: 'underline',
          }}
        >
          {SERVICES_STRINGS.SECTION_TITLE}
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {SERVICES_STRINGS.MAIN_TITLE}
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {SERVICES_STRINGS.SUB_TITLE}
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={1.5} justifyContent="center">
        {SERVICES_DATA.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: 292,
                height: 460,
                borderRadius: 3,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: '0.3s',
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 80px 250px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.img}
                alt={service.title}
                sx={{ objectFit: 'cover' }}
              />

              <CardContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  pb: 2
                }}
              >

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "justify" }}
                  >
                    {service.description}
                  </Typography>
                </Box>



                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                  <Button
                    onClick={handleBookNowClick}
                    sx={{
                      backgroundImage:
                        "linear-gradient(to right, #16A085 0%, #F4D03F 51%, #16A085 100%)",
                      backgroundSize: "200% auto",
                      color: "white",
                      boxShadow: "0 0 20px #eee",
                      borderRadius: "10px",
                      padding: "12px 30px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      transition: "0.5s",
                      "&:hover": {
                        backgroundPosition: "right center",
                        color: "#fff",
                      },
                    }}
                  >
                    {SERVICES_STRINGS.BUTTON_TEXT}
                  </Button>
                </Box>



                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;