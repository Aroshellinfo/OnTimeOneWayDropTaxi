import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES_DATA } from "../../constants/routesData";

const Routes = ({ scrollToBooking }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "green",
                textDecoration: "underline",
                fontSize: "25px",
                paddingBottom: "20px",
              }}
            >
              Routes
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Major Routes
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ minWidth: "200px" }}
          >
            Tamil Nadu, Karnataka, Kerala and Pondicherry
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "70%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", 
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "20px",
            height: "auto",
            alignItems: "start",
          }}
        >
          {ROUTES_DATA.map((route, index) => (
            <Card
              key={index}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: {
                  xs: "260px", 
                  sm: "300px", 
                },
                boxShadow: 4,
                cursor: "pointer",
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                image={route.image}
                alt={route.title}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  backgroundColor: "rgba(248, 245, 245, 0.5)",
                  transition: "opacity 0.3s ease",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (location.pathname === "/" && scrollToBooking) {
                      scrollToBooking();
                    } else {
                      navigate("/book");
                    }
                  }}
                >
                  Book Now
                </Button>
              </Box>
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "white",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  padding: 2,
                }}
              >
                <Typography variant="body2">ONE WAY, ROUND TRIP</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {route.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Routes;
