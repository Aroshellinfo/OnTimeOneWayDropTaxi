import React from 'react';
import { Box, Typography, Paper, Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import contactImage from '../../assets/images/Common/place3.jpg';
import { CONTACT_INFO } from '../../constants/contactData';

const Contacts = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, 
        p: 4,
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <Box
  component="img"
  src={contactImage}
  alt="Contact"
  sx={{
    width: { xs: "100%", md: 400 },
    borderRadius: 2,
    mr: { md: 4 }, 
    mb: { xs: 3, md: 0 }, 
  }}
/>


      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" color="error" fontWeight="bold" sx={{ mb: 1 }}>
          <Link href="" underline="none" color="green">
            {CONTACT_INFO.headingLink}
          </Link>
        </Typography>

        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {CONTACT_INFO.mainHeading}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {CONTACT_INFO.description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }} width={"100%"}>
          <Grid item xs={12}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                width: { xs: "92%", md: "89%" },   
              }}
            >
              <Box sx={{ backgroundColor: "green", p: 1.5, borderRadius: "50%", color: "#fff" }}>
                <LocationOnIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">{CONTACT_INFO.address.title}</Typography>
                <Typography variant="body2">{CONTACT_INFO.address.details}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} width={"100%"}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                width: { xs: "92%", md: "89%" },  
              }}
            >
              <Box sx={{ backgroundColor: "green", p: 1.5, borderRadius: "50%", color: "#fff" }}>
                <PhoneIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">{CONTACT_INFO.generalEnquires.title}</Typography>
                <Typography variant="body2">{CONTACT_INFO.generalEnquires.details}</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} width={"100%"}>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: 2,
                width: { xs: "92%", md: "89%" }, 
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ backgroundColor: "green", p: 1.5, borderRadius: "50%", color: "#fff" }}>
                <AccessTimeIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">{CONTACT_INFO.operationHours.title}</Typography>
                <Typography variant="body2">{CONTACT_INFO.operationHours.details}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            justifyContent: { xs: "center", md: "flex-start" }, 
          }}
        >
          <Link href="https://www.facebook.com/share/1Bj7oxUEiH/?mibextid=wwXIfr" target="_blank">
            <FacebookIcon sx={{ fontSize: 28, color: "blue" }} />
          </Link>
          <Link href="https://twitter.com/YOUR_TWITTER_HANDLE" target="_blank">
            <TwitterIcon sx={{ fontSize: 28, color: "blue" }} />
          </Link>
          <Link href="https://www.instagram.com/ontimeonewaydroptaxi" target="_blank">
            <InstagramIcon sx={{ fontSize: 28, color: "red" }} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;
