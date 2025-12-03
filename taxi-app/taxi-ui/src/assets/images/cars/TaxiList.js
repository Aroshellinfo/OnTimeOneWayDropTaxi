import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip
} from '@mui/material';

import { useNavigate } from "react-router-dom";

import sedan from "../image/Sedan1 .jpg";
import suv from "../image/SUV 1.jpg";
import innova from "../image/innova.jpg";

export default function TariffPage() {

  const navigate = useNavigate();

  const cards = [
    {
      img: sedan,
      title: "Sedan (Dzire/Etios)",
      price: "Rs. 14",
      features: [
        "Round Trip - Rs. 13",
        "Driver Allowance - Rs. 300",
        "One Way - Minimum 130 Km",
        "Round Trip - Minimum 250 Km",
      ],
    },
    {
      img: suv,
      title: "SUV (Xylo/Ertiga)",
      price: "Rs. 19",
      features: [
        "Round Trip - Rs. 18",
        "Driver Allowance - Rs. 400",
        "One Way - Minimum 130 Km",
        "Round Trip - Minimum 250 Km",
      ],
    },
    {
      img: innova,
      title: "Assured Innova",
      price: "Rs. 20",
      features: [
        "Round Trip - Rs. 19",
        "Driver Allowance - Rs. 500",
        "One Way - Minimum 130 Km",
        "Round Trip - Minimum 250 Km",
      ],
    },
  ];

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h5" color="green" fontWeight={700} sx={{ textDecoration: "underline" }}>
        Tariff
      </Typography>

      <Typography variant="h3" fontWeight={700} mt={1}>
        Our Tariff
      </Typography>

      <Box display="flex" justifyContent="space-between" gap={3} mt={5}>
        {cards.map((car, idx) => (
          <Card key={idx} sx={{ width: "32%", borderRadius: 3, boxShadow: 3, position: "relative" }}>
            
            <Box sx={{ position: "relative" }}>
              <CardMedia component="img" height="200" image={car.img} alt={car.title} />

              <Chip
                label="Popular"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontWeight: 600,
                  bgcolor: "black",
                  color: "white"
                }}
              />

              <Chip
                label={car.price}
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  bgcolor: "green",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  p: 2
                }}
              />

              <Typography
                sx={{ position: "absolute", bottom: 20, right: 10, fontWeight: 700 }}
                variant="body2"
              >
                per km
              </Typography>
            </Box>

            <CardContent>
              <Typography variant="h5" fontWeight={700}>
                {car.title}
              </Typography>

              <Typography variant="body1" color="gray" mt={1}>
                One Way
              </Typography>

              <Box mt={2}>
                {car.features.map((f, i) => (
                  <Typography key={i} variant="body2" sx={{ mb: 1 }}>
                    ✓ {f}
                  </Typography>
                ))}
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "green",
                  borderRadius: "20px 0 20px 0",
                  fontSize: 18,
                  fontWeight: 600,
                  width: "200px",
                  ":hover": { bgcolor: "black" }
                }}
                onClick={() => navigate("/book")}
              >
                Book Now
              </Button>
            </CardContent>

          </Card>
        ))}
      </Box>
    </Box>
  );
}