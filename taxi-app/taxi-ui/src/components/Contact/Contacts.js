
import React from 'react';
import { Box, Typography, Paper, Grid, IconButton, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import contactImage from '../../assets/images/Common/Trichy.jpg';

const Contacts = () => {
  return (
    
    <Box sx={{ display: 'flex', gap: 4, p: 4, maxWidth: 900, margin: 'auto' }}>
      <Box component="img" src={contactImage} alt="Contact" sx={{ width: 400, borderRadius: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" color="error" fontWeight="bold" sx={{ mb: 1 }}>
          <Link href="" underline="" color="green">
            Contact Info to
          </Link>
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Reach Our Expert Team
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Send a message through given form, If your enquiry is time sensitive please use below contact details.
        </Typography>

        {/* Contact Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2 }}>
              <Box sx={{ backgroundColor: 'green', p: 1.5, borderRadius: '50%', color: '#fff' }}>
                <LocationOnIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">Address</Typography>
                <Typography variant="body2">
                  No.18, 1st floor,2nd block,3rd Street, Logos church road,Prakruthi township,
                  Babusapalya,Bangalore 560043
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2 }}>
              <Box sx={{ backgroundColor: 'green ', p: 1.5, borderRadius: '50%', color: '#fff' }}>
                <PhoneIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">General Enquires</Typography>
                <Typography variant="body2">
                  Phone: +91 9663150767 & Email: ontimeonewaydroptaxi@gmail.com
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2, width: "194%" }}>
              <Box sx={{ backgroundColor: 'green', p: 1.5, borderRadius: '50%', color: '#fff' }}>
                <AccessTimeIcon />
              </Box>
              <Box>
                <Typography fontWeight="bold">Operation Hours</Typography>
                <Typography variant="body2">Mon-Sunday: 24/7</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Social Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton aria-label="facebook" size="small" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="twitter" size="small" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="instagram" size="small" color="inherit">
            <InstagramIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;
