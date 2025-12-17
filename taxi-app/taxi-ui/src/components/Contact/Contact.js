import React from 'react';
import { Box, Typography, Button, Link as MUILink } from '@mui/material';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import carLogo from "../../assets/images/logo/logo4.png"; 

const Contact = () => {

    const location = useLocation();
    const current = location.pathname;

    const activeStyle = (path) => ({
        color: current === path ? "#126839" : "black", 
        fontWeight: current === path ? "bold" : "normal",
        transition: 'color 0.2s',
        '&:hover': {
            color: '#f5c826',
        }
    });

    return (
        <>
            {/* ------------------- Contact/Call to Action Section (The black box) ------------------- */}
            <Box
                sx={{
                    backgroundColor: '#111',
                    color: 'white',
                    textAlign: 'center',
                    py: 6,
                    px: { xs: 2, md: 4 }, 
                    borderTop: '15px solid #f5c826',
                    borderBottom: '30px solid #f5c826',
                    overflowX: 'hidden', 
                }}
            >
                <Typography variant="h4" sx={{ color: 'green', mb: 1 }}>
                    Need Some Help?
                </Typography>
                <Typography 
                    variant="h3" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ fontSize: { xs: '2rem', sm: '3rem' } }} 
                >
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
                    
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, 
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 1,
                            '& a': { transition: 'color 0.2s', '&:hover': { color: '#f5c826' } } 
                        }}
                    >
                        <MUILink
                            href="mailto:ontimeonewaydroptaxi@gmail.com"
                            sx={{ textDecoration: "none", color: "white", mr: { xs: 0, sm: 1 }, mb: { xs: 0.5, sm: 0 } }} 
                        >
                            ontimeonewaydroptaxi@gmail.com
                        </MUILink>
                        
                        <Typography 
                            component="span" 
                            variant="body2" 
                            sx={{ 
                                display: { xs: 'none', sm: 'inline' }, 
                                color: 'white', 
                                ml: 0, 
                                mr: 0,
                            }}
                        >
                            &nbsp;&amp;&nbsp;
                        </Typography>
                        
                        <MUILink
                            href="tel:+919663150767"
                            sx={{ textDecoration: "none", color: "white", ml: { xs: 0, sm: 1 } }} 
                        >
                            +919663150767
                        </MUILink>
                    </Box>

                </Box>
            </Box>
            
            {/* ------------------- Footer Content Section ------------------- */}
            <Box 
                sx={{ 
                    backgroundColor: '#E6F6F0', 
                    color: 'black', 
                    // Adjusted padding top for the whole section to reduce space after the black box
                    pt: { xs: 2, md: 4 }, 
                    paddingBottom: '20px',
                    overflowX: 'hidden', 
                    px: { xs: 2, md: 4 }, 
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        textAlign: { xs: 'left', md: 'left' } 
                    }}
                >
                    {/* 1. Logo Section (CENTERED) */}
                    <Box
                        sx={{
                            flex: { xs: '1 1 100%', md: '0 0 300px' }, 
                            // Reduced vertical padding (py) to minimize space after the logo
                            py: { xs: 1, md: 3 }, 
                            px: 0, 
                            display: 'flex',
                            // CHANGED: Center logo on all screens
                            justifyContent: 'center', 
                            alignItems: 'center',
                            overflow: 'hidden', 
                        }}
                    >
                        <Box sx={{ display: "flex", p: 0 }}>
                            <img src={carLogo} alt="Aro Logo" style={{ height: 270 }} />
                        </Box>
                    </Box>

                    {/* 2. Get In Touch Section (Kept left aligned) */}
                    <Box 
                        sx={{ 
                            flex: { xs: '1 1 100%', sm: '0 0 45%', md: '0 0 350px' }, 
                            mb: 3, 
                            // Adjust padding-top for mobile if needed, removed fixed left/right
                            p: { xs: '10px 0', md: '30px 10px' }, 
                            textAlign: 'left' 
                        }}
                    >
                        <Typography variant="h6" sx={{ borderBottom: '3px solid yellow', pb: 1, display: 'inline-block' }}>
                            Get In Touch
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 ,fontSize: "16px" }}>
                            <strong>Location</strong><br />
                            No.18, 1st floor, 2nd block, 3rd Street, Logos church road,
                            Prakruthi township, Babusapalya, Bangalore 560043
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 2 ,fontSize: "16px"}}>
    <strong>Contact</strong><br />
    Phone: <MUILink href="tel:+919663150767" sx={{ color: 'black', textDecoration: "none" }}>+919663150767</MUILink><br />
    Mail Us: <MUILink href="mailto:ontimeonewaydroptaxi@gmail.com" sx={{ color: 'black', textDecoration: "none" }}>
        ontimeonewaydroptaxi@gmail.com
    </MUILink>
</Typography>

                        <Box sx={{ display: "flex", gap: 2, mt: 5, justifyContent: 'flex-start' }}>
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

                    {/* 3. Company Navigation Links (Removed extra space/padding) */}
                    <Box 
                        sx={{ 
                            flex: { xs: '1 1 100%', sm: '0 0 45%', md: '0 0 200px' }, 
                            mb: 3, 
                            // CHANGED: Removed paddingTop/paddingLeft that was causing the space on desktop
                            // Use consistent responsive padding for content box
                            p: { xs: '10px 0', md: '30px 0' },
                            textAlign: 'left'
                        }}
                    >
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