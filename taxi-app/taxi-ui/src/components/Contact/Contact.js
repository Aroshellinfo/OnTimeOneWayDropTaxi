import React from 'react';
import { Box, Typography, Button, Link as MUILink } from '@mui/material';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

import carLogo from "../../assets/images/logo/logo4.png"; 

const Contact = () => {

    const location = useLocation();
    const current = location.pathname;

    const activeStyle = (path) => ({
        color: current === path ? "lightgreen" : "#ccc",
        fontWeight: current === path ? "bold" : "normal",
    });

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#111',
                    color: 'white',
                    textAlign: 'center',
                    py: 6,
                    px: 4,
                    borderTop: '15px solid #f5c826',
                    borderBottom: '30px solid #f5c826',
                }}
            >
                <Typography variant="h4" sx={{ color: 'green', mb: 1 }}>
                    Need Some Help?
                </Typography>

                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Ready to Start Your Travel?
                </Typography>

                <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Whether you're stuck or just want some tips on where to start, hit up our experts anytime.
                </Typography>

                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#126839',
                            color: 'white',
                            borderRadius: '25px',
                            px: 4,
                            py: 1.5,
                            fontSize: '16px',
                            mb: 3,
                            '&:hover': {
                                backgroundColor: "#f5c826",
                                color: 'black',
                            },
                        }}
                        href="tel:+919663150767"
                    >
                        Call Now
                    </Button>

                    <Typography variant="body2">Contact Us Soon</Typography>

                    
                    <Typography variant="body2">
                    <MUILink href="mailto:ontimeonewaydroptaxi@gmail.com" sx={{ color: '#40b4ff', mr: 1 }}>
                        ontimeonewaydroptaxi@gmail.com
                    </MUILink>

                    &nbsp; &amp; &nbsp;

                    <MUILink href="tel:+919663150767" sx={{ color: '#40b4ff', ml: 1 }}>
                        +919663150767
                    </MUILink>
                    </Typography>

                </Box>
            </Box>
            <Box sx={{ backgroundColor: '#E6F6F0', color: 'black', paddingBottom: '0.1px' }}>
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: "flex", p: "7px 30px", paddingRight: "60px" }}>
                        <img src={carLogo} alt="Aro Logo" style={{ height: 270 , marginLeft:"13%" }} />
                    </Box>
                    <Box sx={{ flex: '1 1 200px', mb: 3, p: "30px" }}>
                        <Typography variant="h6" sx={{ borderBottom: '3px solid yellow', pb: 1, display: 'inline-block' }}>
                            Get In Touch
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 ,fontSize: "16px"  }}>
                            <strong>Location</strong><br />
                            No.18, 1st floor, 2nd block, 3rd Street, Logos church road,
                            Prakruthi township, Babusapalya, Bangalore 560043
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 ,fontSize: "16px"}}>
                            <strong>Contact</strong><br />
                            Phone: <MUILink href="tel:+919663150767" sx={{ color: 'black' }}>+919663150767</MUILink><br />
                            Mail Us: <MUILink href="mailto:ontimeonewaydroptaxi@gmail.com" sx={{ color: 'black' }}>
                                ontimeonewaydroptaxi@gmail.com
                            </MUILink>
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
                            <MUILink href="https://www.facebook.com/share/1Bj7oxUEiH/?mibextid=wwXIfr" target="_blank" rel="noopener">
                                <Facebook sx={{ fontSize: 28, color:"blue"}} />
                            </MUILink>
                            <MUILink href="https://twitter.com/YOUR_TWITTER_HANDLE" target="_blank" rel="noopener">
                                <Twitter sx={{ fontSize: 28, color:"blue"}} />
                            </MUILink>
                            <MUILink 
                                href="https://www.instagram.com/ontimeonewaydroptaxi?igsh=cWp4NWxhNTE3b3Vr&utm_source=qr" 
                                target="_blank" 
                                rel="noopener" 
                            >
                                <Instagram sx={{ fontSize: 28, color: "red" }} />
                            </MUILink>
                        </Box>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', mb: 3, paddingTop: 5, paddingLeft: 5 }}>
                        <Typography variant="h6" sx={{ borderBottom: '3px solid yellow', pb: 1, display: 'inline-block' }}>
                            Company
                        </Typography>

                        <Box sx={{ mt: 1 }}>
                            <MUILink
                                component={RouterLink}
                                to="/"
                                sx={{
                                    display: 'block',
                                    mb: 1,
                                    textDecoration: "none",
                                    ...activeStyle("/"),
                                    fontSize: "16px",
                                    color:"black",
                                }}
                            >
                                Home
                            </MUILink>
                            <MUILink
                                component={RouterLink}
                                to="/tariff"
                                sx={{
                                    display: 'block',
                                    mb: 1,
                                    textDecoration: "none",
                                    ...activeStyle("/tariff"),
                                    color:"black",
                                    fontSize: "16px"
                                }}
                            >
                                Tariff
                            </MUILink>
                            <MUILink
                                component={RouterLink}
                                to="/ContactInfoPage"
                                sx={{
                                    display: 'block',
                                    textDecoration: "none",
                                    ...activeStyle("/ContactInfoPage"),
                                    color:"black",
                                    fontSize: "16px"
                                }}
                            >
                                Contact Us
                            </MUILink>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Contact;