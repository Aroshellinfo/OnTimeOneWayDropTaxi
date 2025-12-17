import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#e6f6f0",
        color: "black",
        padding: "15px 6%",
        borderTop: "1px solid black",
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        © Designed & Developed by{" "}
        <Link
          href="https://www.aroshell.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ fontWeight: "bold", color: "black", whiteSpace: "nowrap" }}
        >
          Aroshell infotech pvt
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
