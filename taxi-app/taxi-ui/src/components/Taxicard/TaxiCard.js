import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaxiCard = ({
  image,
  title,
  pricePerKm,
  roundTripRate,
  driverAllowance,
  oneWayMinKm,
  roundTripMinKm,
  isPopular
}) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 320, position: 'relative', boxShadow: 4, borderRadius: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />

        {isPopular && (
          <Chip
            label="Popular"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#000',
              color: '#fff',
              fontWeight: 'bold'
            }}
          />
        )}

        <Box
          sx={{
            position: 'absolute',
            bottom: -15,
            left: 15,
            backgroundColor: 'yellow',
            color: 'black',
            padding: '4px 12px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '4px'
          }}
        >
          Rs. {pricePerKm}
        </Box>
      </Box>

      <CardContent sx={{ pt: 4 }}>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>

        <Typography variant="body2" color="textSecondary">One Way</Typography>

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="body2">✔️ Round Trip - Rs. {roundTripRate}</Typography>
          <Typography variant="body2">✔️ Driver Allowance - Rs. {driverAllowance}</Typography>
          <Typography variant="body2">✔️ One Way - Minimum {oneWayMinKm} Km</Typography>
          <Typography variant="body2">✔️ Round Trip - Minimum {roundTripMinKm} Km</Typography>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/book')}
          sx={{ backgroundColor: 'yellow', fontWeight: 'bold', color: 'black' }}
        >
          BOOK NOW
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaxiCard;