import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card
} from "@mui/material";
import taxiImage from "../../assets/images/taxis/droptaxi.png";

function ContactInfo() {
  return (
    <Box sx={{ p: 4, backgroundColor: "#fff5f5" }}>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Affordable 24/7 taxi service anywhere in and around Tamilnadu,
            Kerala, Pondicherry and nearby States.
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#d32f2f"
            gutterBottom
          >
            ONE WAY DROP TAXI @ RS.13/KM ONWARDS
          </Typography>

          <Typography variant="body1" gutterBottom>
            Need a ride? Just call or WhatsApp
          </Typography>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#d32f2f" }}
              href="tel:+919663150767"
            >
              Call Now
            </Button>

            <Button
              variant="outlined"
              sx={{ borderColor: "#d32f2f", color: "#d32f2f" }}
              href="https://wa.me/919663150767"
              target="_blank"
            >
              Book Now
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <img
            src={taxiImage}
            alt="Taxi"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          mt: 5,
          alignItems: "stretch" 
        }}
      >
        {/* CARD 1 */}

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Card
            sx={{
              p: 3,
              flex: 1,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Address
            </Typography>
            <Typography variant="body2">
              123, Main Road, Coimbatore, Tamil Nadu – 641001.
            </Typography>
          </Card>
        </Grid>

        {/* CARD 2 */}

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Card
            sx={{
              p: 3,
              flex: 1,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              General Enquiries
            </Typography>
            <Typography variant="body2">
              Email: support@taxi.com
              <br />
              Office Hours: 24/7 Available
            </Typography>
          </Card>
        </Grid>

        {/* CARD 3 */}
        
        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Card
            sx={{
              p: 3,
              flex: 1,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Phone Numbers
            </Typography>
            <Typography variant="body2">
              +91 98765 43210
              <br />
              +91 87654 32109
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactInfo;
