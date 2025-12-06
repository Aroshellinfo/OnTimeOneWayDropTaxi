import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#e6f6f0",
        color: "black",
        textAlign: "end",
        padding: "15px 6%",
        marginBottom: "0px",
        borderTop:"1px solid black"
      }}
    >
      <Typography variant="body2">
        © Designed & Developed by{" "}
        <Link
          href="https://www.aroshell.com/"  
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Aroshell infotech pvt
        </Link>.
      </Typography>
    </Box>
  );
}

export default Footer;