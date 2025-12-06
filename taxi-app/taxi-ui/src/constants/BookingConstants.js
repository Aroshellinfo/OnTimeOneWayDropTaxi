
import sedanImg from "../assets/images/cars/Sedan10.png";
import etiosImg from "../assets/images/cars/Etios10.png";
import suvImg from "../assets/images/cars/SUV10.png";
import innovaImg from "../assets/images/cars/SUV10.png";

export const CAR_DATA = [
  { name: "Sedan", rate: "14 ₹ / Km", image: sedanImg },
  { name: "Etios", rate: "15 ₹ / Km", image: etiosImg },
  { name: "SUV", rate: "19 ₹ / Km", image: suvImg },
  { name: "Innova", rate: "20 ₹ / Km", image: innovaImg },
];

export const TRIP_TYPES = [
  { id: "oneway", label: "ONE WAY" },
  { id: "round", label: "ROUND TRIP" },
];

export const GOOGLE_MAPS_API_KEY =
  "AIzaSyAfdXSgM9I_IsaeXAclxlyN-5kUWAnGNJI";

export const BOOKING_API_ENDPOINT = "http://localhost:8080/api/bookings";
