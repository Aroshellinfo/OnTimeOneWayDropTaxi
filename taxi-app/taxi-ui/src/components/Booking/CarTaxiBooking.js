import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

import {
  Place,
  Event,
  Smartphone,
  Email,
  Schedule,
  Person,
} from "@mui/icons-material";

import {
  CAR_DATA,
  TRIP_TYPES,
  GOOGLE_MAPS_API_KEY,
  BOOKING_API_ENDPOINT,
} from "../../constants/BookingConstants";

function CarTaxiBooking() {
  const [tripType, setTripType] = useState("oneway");
  const [selectedCar, setSelectedCar] = useState(CAR_DATA[0].name);

  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  const [pickupSelected, setPickupSelected] = useState(false);
  const [dropSelected, setDropSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");

  const [onewayForm, setOnewayForm] = useState({
    pickup: "",
    pickupDate: "",
    mobile: "",
    email: "",
    drop: "",
    pickupTime: "",
    name: "",
  });

  const [roundForm, setRoundForm] = useState({
    pickup: "",
    pickupDate: "",
    returnDate: "",
    mobile: "",
    email: "",
    drop: "",
    pickupTime: "",
    returnTime: "",
    name: "",
  });

  // <-- ADDED: errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      GOOGLE_MAPS_API_KEY +
      "&libraries=places";
    script.async = true;

    script.onload = () => {
      const pickupAuto = new window.google.maps.places.Autocomplete(
        pickupRef.current
      );

      pickupAuto.addListener("place_changed", () => {
        const place = pickupAuto.getPlace();
        if (!place?.formatted_address) return;

        setPickupSelected(true);

        if (tripType === "oneway") {
          setOnewayForm((p) => ({ ...p, pickup: place.formatted_address }));
        } else {
          setRoundForm((p) => ({ ...p, pickup: place.formatted_address }));
        }
      });

      const dropAuto = new window.google.maps.places.Autocomplete(
        dropRef.current
      );

      dropAuto.addListener("place_changed", () => {
        const place = dropAuto.getPlace();
        if (!place?.formatted_address) return;

        setDropSelected(true);

        if (tripType === "oneway") {
          setOnewayForm((p) => ({ ...p, drop: place.formatted_address }));
        } else {
          setRoundForm((p) => ({ ...p, drop: place.formatted_address }));
        }
      });
    };

    document.body.appendChild(script);
  }, [tripType]);

  // small change: clear field error on change
  const handleChange = (setter, state, field, value) => {
    setter({ ...state, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const showPopup = (msg, type) => {
    setPopupMsg(msg);
    setPopupType(type);
    setTimeout(() => setPopupMsg(""), 3000);
  };

  // validation function
  const validateFields = () => {
    const formData = tripType === "oneway" ? onewayForm : roundForm;
    const newErrors = {};

    if (!formData.pickup) newErrors.pickup = "Please enter pickup location";
    if (!formData.drop) newErrors.drop = "Please enter drop location";

    if (!formData.pickupDate) newErrors.pickupDate = "Please select pickup date";
    if (!formData.pickupTime) newErrors.pickupTime = "Please select pickup time";

    if (!formData.name) newErrors.name = "Please enter your name";

    if (!formData.email) newErrors.email = "Please enter email";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.mobile) newErrors.mobile = "Please enter phone number";
    else if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "Please enter a valid phone number";

    if (tripType === "round") {
      if (!formData.returnDate) newErrors.returnDate = "Please select return date";
      if (!formData.returnTime) newErrors.returnTime = "Please select return time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = tripType === "oneway" ? onewayForm : roundForm;

    // <-- REPLACED required fields check with validateFields call
    if (!validateFields()) {
      setLoading(false);
      return;
    }

    if (!pickupSelected) {
      setErrors((prev) => ({ ...prev, pickup: "Select pickup from Google suggestions!" }));
      showPopup("Select pickup from Google suggestions!", "error");
      setLoading(false);
      return;
    }

    if (!dropSelected) {
      setErrors((prev) => ({ ...prev, drop: "Select drop from Google suggestions!" }));
      showPopup("Select drop from Google suggestions!", "error");
      setLoading(false);
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setErrors((prev) => ({ ...prev, mobile: "Invalid mobile number!" }));
      showPopup("Invalid mobile number!", "error");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email!" }));
      showPopup("Invalid email!", "error");
      setLoading(false);
      return;
    }

    if (tripType === "round") {
      if (!formData.returnDate || !formData.returnTime) {
        setErrors((prev) => ({ ...prev, returnDate: formData.returnDate ? "" : "Return date required", returnTime: formData.returnTime ? "" : "Return time required" }));
        showPopup("Return date & time required!", "error");
        setLoading(false);
        return;
      }
    }

    const bookingData = {
      tripType,
      selectedCar,
      pickup: formData.pickup,
      dropLocation: formData.drop,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      returnDate: tripType === "round" ? formData.returnDate : null,
      returnTime: tripType === "round" ? formData.returnTime : null,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    };

    try {
      await axios.post(BOOKING_API_ENDPOINT, bookingData);
      showPopup("Booking Successful!", "success");
    } catch (err) {
      showPopup("Booking Failed!", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* YOUR SAME STYLES — NEVER TOUCHED */}
      <style>{`
       body { 
          font-family: Arial; 
          background:#f5f5f5; 
          padding:0px; 
          overflow-x:hidden; 
        }
        .common { max-width:900px; margin:auto; }
        .oneway { margin-top:20px; text-align:center; }
        .oneway button { padding:10px 30px; font-size:14px; background:#f0f0f0; border:none; cursor:pointer; }
        .oneway .active { background:#e9eeebff; border-top:2px solid #126839; }
        .form-wrapper { background:#E6F6F0; border:2px solid #126839; padding:17px; border-radius:12px; }
        .form-container { display:flex; gap:40px; flex-wrap:wrap; }
        .form-left, .form-right { flex:1; min-width:300px; }
        .form-group { margin-bottom:20px; }
        .input-icon { display:flex; align-items:center; background:#fff; border:1px solid #ccc; border-radius:12px; padding:10px; }
        .input-icon input { border:none; width:100%; outline:none; font-size:16px; }
        .car-selection { display:flex; justify-content:space-between; margin-bottom:20px; }
        .car { flex:1; padding:5px; cursor:pointer; margin:0 5px; border:2px solid transparent; text-align:center; }
        .car.selected { border-color:#126839; background:white; }
        .car img { width:80px; height:60px; object-fit:contain; }
        .car-rate { color:red; font-weight:bold; }
        .book-btn { width:100%; background:#126839; color:white; padding:10px; height:48px; font-size:20px; border-radius:10px; margin-top:20px; }
        .book-btn:disabled { background:gray; cursor:not-allowed; }
        .popup-msg { padding:10px; border-radius:8px; margin-top:10px; font-size:15px; text-align:center; }
        .popup-success { background:#c7f9cc; color:#126839; }
        .popup-error { background:#ffcccc; color:#b30000; }
      `}</style>

      <Box className="center-wrapper">
        <Box className="common">
          {/* TRIP SWITCH */}
          <Box className="oneway">
            {TRIP_TYPES.map((t) => (
              <Button
                key={t.id}
                onClick={() => setTripType(t.id)}
                className={tripType === t.id ? "active" : ""}
              >
                {t.label}
              </Button>
            ))}
          </Box>

          {/* FORM */}
          <Box className="form-wrapper">
            <Box className="form-container">
              {/* LEFT */}
              <Box className="form-left">
                {/* Car Selection */}
                <Box className="car-selection">
                  {CAR_DATA.map((car) => (
                    <Box
                      key={car.name}
                      className={`car ${
                        selectedCar === car.name ? "selected" : ""
                      }`}
                      onClick={() => setSelectedCar(car.name)}
                    >
                      <img src={car.image} alt={car.name} />
                      <Typography>{car.name}</Typography>
                      <Typography className="car-rate">{car.rate}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* PICKUP */}
                <Box className="form-group">
                  <label>Pick-up Location *</label>
                  <Box className="input-icon">
                    <Place />
                    <input
                      ref={pickupRef}
                      type="text"
                      placeholder="Pickup Address"
                      value={
                        tripType === "oneway"
                          ? onewayForm.pickup
                          : roundForm.pickup
                      }
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "pickup",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "pickup",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.pickup && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.pickup}
                    </span>
                  )}
                </Box>

                {/* PICKUP DATE */}
                <Box className="form-group">
                  <label>Pick-up Date *</label>
                  <Box className="input-icon">
                    <Event />
                    <input
                      type="date"
                      value={
                        tripType === "oneway"
                          ? onewayForm.pickupDate
                          : roundForm.pickupDate
                      }
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "pickupDate",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "pickupDate",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.pickupDate && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.pickupDate}
                    </span>
                  )}
                </Box>

                {/* RETURN DATE */}
                {tripType === "round" && (
                  <Box className="form-group">
                    <label>Return Date *</label>
                    <Box className="input-icon">
                      <Event />
                      <input
                        type="date"
                        value={roundForm.returnDate}
                        onChange={(e) =>
                          handleChange(
                            setRoundForm,
                            roundForm,
                            "returnDate",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    {errors.returnDate && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.returnDate}
                      </span>
                    )}
                  </Box>
                )}

                {/* MOBILE */}
                <Box className="form-group">
                  <label>Mobile *</label>
                  <Box className="input-icon">
                    <Smartphone />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={
                        tripType === "oneway"
                          ? onewayForm.mobile
                          : roundForm.mobile
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d*$/.test(v)) {
                          tripType === "oneway"
                            ? handleChange(
                                setOnewayForm,
                                onewayForm,
                                "mobile",
                                v
                              )
                            : handleChange(
                                setRoundForm,
                                roundForm,
                                "mobile",
                                v
                              );
                        }
                      }}
                    />
                  </Box>
                  {errors.mobile && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.mobile}
                    </span>
                  )}
                </Box>
              </Box>

              {/* RIGHT */}
              <Box className="form-right">
                
                {/* EMAIL */}
                <Box className="form-group">
                  <label>Email *</label>
                  <Box className="input-icon">
                    <Email />
                    <input
                      type="email"
                      placeholder="Email"
                      value={
                        tripType === "oneway"
                          ? onewayForm.email
                          : roundForm.email
                      }
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "email",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "email",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.email}
                    </span>
                  )}
                </Box>

                {/* DROP */}
                <Box className="form-group">
                  <label>Drop Location *</label>
                  <Box className="input-icon">
                    <Place />
                    <input
                      ref={dropRef}
                      type="text"
                      placeholder="Drop Address"
                      value={
                        tripType === "oneway"
                          ? onewayForm.drop
                          : roundForm.drop
                      }
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "drop",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "drop",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.drop && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.drop}
                    </span>
                  )}
                </Box>

                {/* PICKUP TIME */}
                <Box className="form-group">
                  <label>Pick-up Time *</label>
                  <Box className="input-icon">
                    <Schedule />
                    <input
                      type="time"
                      value={
                        tripType === "oneway"
                          ? onewayForm.pickupTime
                          : roundForm.pickupTime
                      }
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "pickupTime",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "pickupTime",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.pickupTime && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.pickupTime}
                    </span>
                  )}
                </Box>

                {/* RETURN TIME */}
                {tripType === "round" && (
                  <Box className="form-group">
                    <label>Return Time *</label>
                    <Box className="input-icon">
                      <Schedule />
                      <input
                        type="time"
                        value={roundForm.returnTime}
                        onChange={(e) =>
                          handleChange(
                            setRoundForm,
                            roundForm,
                            "returnTime",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    {errors.returnTime && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.returnTime}
                      </span>
                    )}
                  </Box>
                )}

                {/* NAME */}
                <Box className="form-group">
                  <label>Name *</label>
                  <Box className="input-icon">
                    <Person />
                    <input
                      type="text"
                      placeholder="Name"
                      value={
                        tripType === "oneway"
                          ? onewayForm.name
                          : roundForm.name
                      }
                      
                      onChange={(e) =>
                        tripType === "oneway"
                          ? handleChange(
                              setOnewayForm,
                              onewayForm,
                              "name",
                              e.target.value
                            )
                          : handleChange(
                              setRoundForm,
                              roundForm,
                              "name",
                              e.target.value
                            )
                      }
                    />
                  </Box>
                  {errors.name && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.name}
                    </span>
                  )}

                  <Button
                    className="book-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "BOOK NOW"}
                  </Button>

                  {popupMsg && (
                    <Box
                      className={`popup-msg ${
                        popupType === "success"
                          ? "popup-success"
                          : "popup-error"
                      }`}
                    >
                      {popupMsg}
                    </Box>
                  )}
                  
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CarTaxiBooking;