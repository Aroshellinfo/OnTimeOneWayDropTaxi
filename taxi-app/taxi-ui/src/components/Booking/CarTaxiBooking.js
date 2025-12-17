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
// NOTE: These constants and the loadingGif import must be correctly defined in your project
import {
  CAR_DATA,
  TRIP_TYPES,
  GOOGLE_MAPS_API_KEY,
} from "../../constants/BookingConstants";
import loadingGif from "../../assets/images/cars/loading2.gif";

const hasValue = (value) =>
  value !== null && value !== undefined && value !== "";

// ⭐ REVISED FLOATING LABEL INPUT FIELD
const InputField = ({
  Icon,
  label,
  value,
  onChange,
  type = "text",
  inputRef = null,
  error,
  id,
}) => {
  // Determine if the input has content for the floating label effect
  const isDateOrTime = type === "date" || type === "time";
  const shouldFloat = hasValue(value);

  // ⭐ Normalize time input to always HH:MM
  let displayValue = value;
  if (type === "time" && hasValue(value)) {
    const date = new Date(`1970-01-01T${value}`);
    if (!isNaN(date.getTime())) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      displayValue = `${hours}:${minutes}`;
    }
  }

  // Note: For date/time inputs, the 'has-content' class is only used to trigger the label float, 
  // and the CSS handles the visibility of the default ghost text.

  return (
    <Box className="form-group floating-group">
      <Box className={`input-icon ${error ? "input-error" : ""}`}>
        <Icon className="input-icon-svg" />

        <input
          id={id}
          ref={inputRef}
          type={type}
          value={displayValue}
          onChange={(e) => {
            onChange(e);
          }}
          autoComplete="off"
          // Apply 'has-content' ONLY if a value is present, allowing the label to drop back down if empty
          className={shouldFloat ? "has-content" : ""}
          placeholder=" " /* <-- crucial for floating label */
          inputMode={type === "tel" ? "numeric" : undefined} /* mobile number numeric keyboard */
          pattern={type === "tel" ? "[0-9]*" : undefined}
        />

        <label htmlFor={id} className="floating-label">
          {label}
        </label>
      </Box>

      {error && <span className="error-text">{error}</span>}
    </Box>
  );
};

function CarTaxiBooking() {
  const [tripType, setTripType] = useState("oneway");
  const [selectedCar, setSelectedCar] = useState(CAR_DATA[0].name);

  // Refs for Google Maps Autocomplete
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");

  const [lastBooking, setLastBooking] = useState(null);

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

  const [errors, setErrors] = useState({});

  // ⭐ GOOGLE AUTOCOMPLETE EFFECT
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;

    const loadScript = () => {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (!window.google || !pickupRef.current || !dropRef.current) return;

      const pickupAuto = new window.google.maps.places.Autocomplete(
        pickupRef.current
      );
      pickupAuto.addListener("place_changed", () => {
        const place = pickupAuto.getPlace();
        const text = place?.formatted_address || "";
        tripType === "oneway"
          ? setOnewayForm((p) => ({ ...p, pickup: text }))
          : setRoundForm((p) => ({ ...p, pickup: text }));
        setErrors((prev) => ({ ...prev, pickup: "" }));
      });

      const dropAuto = new window.google.maps.places.Autocomplete(dropRef.current);
      dropAuto.addListener("place_changed", () => {
        const place = dropAuto.getPlace();
        const text = place?.formatted_address || "";
        tripType === "oneway"
          ? setOnewayForm((p) => ({ ...p, drop: text }))
          : setRoundForm((p) => ({ ...p, drop: text }));
        setErrors((prev) => ({ ...prev, drop: "" }));
      });
    };

    loadScript();
  }, [tripType]);

  const handleChange = (setter, state, field, value) => {
    setter({ ...state, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const showPopup = (msg, type) => {
    setPopupMsg(msg);
    setPopupType(type);
    setTimeout(() => setPopupMsg(""), 3500);
  };

  const validateFields = () => {
    const formData = tripType === "oneway" ? onewayForm : roundForm;
    const newErrors = {};

    const required = (field, msg) => {
      if (!hasValue(formData[field])) newErrors[field] = msg;
    };

    required("pickup", "Please enter pickup location");
    required("drop", "Please enter drop location");
    required("pickupDate", "Select pickup date");
    required("pickupTime", "Select pickup time");
    required("name", "Enter your name");
    required("email", "Enter valid email");
    required("mobile", "Enter phone number");

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = "Invalid 10-digit phone number";

    if (tripType === "round") {
      required("returnDate", "Select return date");
      required("returnTime", "Select return time");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = tripType === "oneway" ? onewayForm : roundForm;

    if (
      lastBooking &&
      lastBooking.name === formData.name &&
      lastBooking.pickup === formData.pickup &&
      lastBooking.drop === formData.drop
    ) {
      showPopup("You already booked this trip!", "error");
      return;
    }

    setLoading(true);

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

    const API_BASE_URL = process.env.REACT_APP_BOOKING_API_ENDPOINT;
    const API_URL = `${API_BASE_URL}/api/bookings`;

    if (!API_BASE_URL) {
      showPopup("API endpoint missing in environment variables!", "error");
      setLoading(false);
      return;
    }

    try {
      await axios.post(API_URL, bookingData);

      setLastBooking({
        name: formData.name,
        pickup: formData.pickup,
        drop: formData.drop,
      });

      showPopup("Booking Successful! Confirmation sent.", "success");

      // Reset forms
      setOnewayForm({
        pickup: "",
        pickupDate: "",
        mobile: "",
        email: "",
        drop: "",
        pickupTime: "",
        name: "",
      });

      setRoundForm({
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

      setLoading(false);
    } catch (err) {
      console.error("Booking submission error:", err);
      showPopup("Booking Failed! Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        
        
        html { 
            width: 100%; 
            margin: 0; 
            padding: 0; 
            {/* overflow-x: hidden; */}
            
        }
        body { 
            width: 100%; 
            margin: 0; 
            padding: 0; 
            overflow-x: hidden; /* This should catch the overflow */
            font-family: Arial; 
            background:#f5f5f5; 
        }

        .center-wrapper { width: 100%; }
        .common { max-width:900px; width: 100%; margin:auto; padding:7px; margin-bottom:20px;  }
        .oneway { margin-top:20px; text-align:center; }
        .oneway button { padding:10px 30px; font-size:14px; background:#f0f0f0; border:none; cursor:pointer; }
        .oneway .active { background:#e9eeebff; border-top:2px solid #126839; color:#126839; }
        .form-wrapper { background:#E6F6F0; border:2px solid #126839; padding: 17px 20px; border-radius:12px; }
        .form-container { display:flex; gap:40px; flex-wrap:wrap; }
        .form-left, .form-right { flex:1; min-width:300px; }
        .input-icon {
          display: flex;
          align-items: center; 
          background: #fff; 
          padding: 18px 10px 8px 10px; 
          border-radius: 12px;
          border: 1px solid #ccc;
        }

        .input-icon svg {
          color: #126839; 
          font-size: 24px;
          transform: translateY(-5px); 
        }

        /* RED BORDER when error */
.input-icon.input-error {
  border: 2px solid #f83434ff !important;
}

.error-text {
  color: #f54a4aff !important;
}


        .input-icon:focus-within { border-color: #126839; border-width: 2px; }
        .input-icon input { border:none; background: #ffffff !important; width:100%; outline:none; font-size:16px; margin-left: 8px; z-index: 1; transform: translateY(-5px); }
        .floating-group { margin-bottom: 20px; position: relative; }
        .floating-label { position: absolute; top: 50%; left: 45px; transform: translateY(-50%); color: #999; transition: 0.2s ease-out; pointer-events: none; font-size: 16px; z-index: 2; background: transparent; padding: 0; }
        .input-icon input:focus ~ .floating-label, .input-icon input.has-content ~ .floating-label, .input-icon input.has-content-on-focus ~ .floating-label { top: 0px; left: 40px; transform: translateY(-50%); font-size: 14px; color: #126839; background: #E6F6F0; padding: 0 4px; z-index: 3; }
        .input-icon input[type="date"], .input-icon input[type="time"] { color: #000; }
        .input-icon input[type="date"]::-webkit-datetime-edit { color: #000; }
        .input-icon input[type="date"]:not(.has-content):not(:focus)::-webkit-datetime-edit { color: transparent; }

        .input-icon input[type="date"]:not(.has-content):not(:focus)::-webkit-datetime-edit,
        .input-icon input[type="time"]:not(.has-content):not(:focus)::-webkit-datetime-edit {
          color: transparent;
        }
        .car-selection { display:flex; justify-content:space-between; margin-bottom:20px; }
        .car { flex:1; padding:5px; cursor:pointer; margin:0 18px; border:2px solid transparent; text-align:center; border-radius:11px}
        .car.selected { border-color:#126839; background:white; }
        .car img { width:80px; height:60px; object-fit:contain; }
        .car-rate { color:red; font-weight:bold; }
        .book-btn { width:100%; background:#126839; color:white; padding:10px; height:48px; font-size:20px; border-radius:10px; margin-top:20px; position: relative; overflow: hidden; transition: background 0.3s ease; display:flex; align-items:center; justify-content:center; }
        .book-btn:disabled { background: #488c65ff; cursor:not-allowed; }
        .popup-msg { padding:12px 20px; border-radius:8px; font-size:15px; text-align:center; position: fixed; top: -100px; left: 50%; transform: translateX(-50%); z-index: 9999; transition: top 0.5s ease-in-out; min-width: 250px; }
        .popup-success { background:#c7f9cc; color:#126839; }
        .popup-error { background:#ffcccc; color:#b30000; }
        .popup-show { top: 20px; }
        
        /* BEGIN MOBILE VIEW FIXES (200px to 600px range) */
        @media (max-width: 768px) {
          /* Do not set width 100% and overflow-x:hidden here on html, body as it is set above */
          .common { 
            padding: 0 18px; 
            overflow-x: hidden;
            margin-bottom : 30px;
          }
          .form-container { flex-direction: column; gap: 0; }
          .form-left, .form-right { width: 100%; min-width: unset; }

          /* Car Selection refinement */
          .car-selection { 
            justify-content: space-around; 
            margin-left: 0; /* Remove negative margins on container */
            margin-right: 0;
            gap: 5px; /* Introduce a small gap for flexible spacing */
          }
          .car { 
            flex: 1 1 30%; /* Allow cars to shrink to fit 1/3 of the width */
            margin: 0 2px; /* Minimal margin between cars */
          }
          .car img { width: 60px; height: 60px; }
          .car .MuiTypography-root:first-of-type { font-size: 12px; }
          .car-rate { font-size: 10px; }

          /* Ensure input groups fit the full width */
          .floating-group { width: 100%; }
        }

        @media (max-width: 450px) {
          /* Further flexibility for very narrow screens */
          .car { 
            flex: 1 1 0; 
            margin: 0 1px; /* Even tighter spacing */
          }
        }

        @media (max-width: 368px) {
          .floating-group {
            margin-bottom: 14px !important; 
          }
          .input-icon {
            padding: 14px 10px 10px 10px !important; 
          }
          .input-icon svg {
            transform: translateY(-5px) !important;
          }
        }
        /* END MOBILE VIEW FIXES */
      `}</style>

      {/* ---------------- HTML/JSX STARTS HERE ---------------- */}
      <Box className="center-wrapper">
        <Box className="common">
          {/* Trip Type Selector */}
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

          <Box className="form-wrapper" component="form" onSubmit={handleSubmit}>
            <Box className="form-container">
              {/* LEFT */}
              <Box className="form-left">
                {/* Car Selection Section */}
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

                {/* Pick-up Location */}
                <InputField
                  Icon={Place}
                  id="pickup-location"
                  inputRef={pickupRef}
                  label="Pick-up Location *"
                  value={tripType === "oneway" ? onewayForm.pickup : roundForm.pickup}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "pickup", e.target.value)
                      : handleChange(setRoundForm, roundForm, "pickup", e.target.value)
                  }
                  error={errors.pickup}
                />

                <InputField
                  Icon={Event}
                  id="pickup-date"
                  type="date"
                  label="Pick-up Date *"
                  value={tripType === "oneway" ? onewayForm.pickupDate : roundForm.pickupDate}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "pickupDate", e.target.value)
                      : handleChange(setRoundForm, roundForm, "pickupDate", e.target.value)
                  }
                  error={errors.pickupDate}
                />

                {tripType === "round" && (
                  <InputField
                    Icon={Event}
                    id="return-date"
                    type="date"
                    label="Return Date *"
                    value={roundForm.returnDate}
                    onChange={(e) =>
                      handleChange(setRoundForm, roundForm, "returnDate", e.target.value)
                    }
                    error={errors.returnDate}
                  />
                )}
                {/* Mobile Number */}
                <InputField
                  Icon={Smartphone}
                  id="mobile"
                  type="tel"
                  label="Mobile *"
                  value={tripType === "oneway" ? onewayForm.mobile : roundForm.mobile}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^\d*$/.test(v) && v.length <= 10) {
                      tripType === "oneway"
                        ? handleChange(setOnewayForm, onewayForm, "mobile", v)
                        : handleChange(setRoundForm, roundForm, "mobile", v);
                    }
                  }}
                  error={errors.mobile}
                />
              </Box>

              {/* RIGHT */}
              <Box className="form-right">
                {/* Email */}
                <InputField
                  Icon={Email}
                  id="email"
                  type="email"
                  label="Email *"
                  value={tripType === "oneway" ? onewayForm.email : roundForm.email}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "email", e.target.value)
                      : handleChange(setRoundForm, roundForm, "email", e.target.value)
                  }
                  error={errors.email}
                />

                {/* Drop Location */}
                <InputField
                  Icon={Place}
                  id="drop-location"
                  inputRef={dropRef}
                  label="Drop Location *"
                  value={tripType === "oneway" ? onewayForm.drop : roundForm.drop}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "drop", e.target.value)
                      : handleChange(setRoundForm, roundForm, "drop", e.target.value)
                  }
                  error={errors.drop}
                />

                {/* Pick-up Time */}
                <InputField
                  Icon={Schedule}
                  id="pickup-time"
                  type="time"
                  label="Pick-up Time *"
                  value={tripType === "oneway" ? onewayForm.pickupTime : roundForm.pickupTime}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "pickupTime", e.target.value)
                      : handleChange(setRoundForm, roundForm, "pickupTime", e.target.value)
                  }
                  error={errors.pickupTime}
                />

                {/* Return Time (Round Trip Only) */}
                {tripType === "round" && (
                  <InputField
                    Icon={Schedule}
                    id="return-time"
                    type="time"
                    label="Return Time *"
                    value={roundForm.returnTime}
                    onChange={(e) =>
                      handleChange(setRoundForm, roundForm, "returnTime", e.target.value)
                    }
                    error={errors.returnTime}
                  />
                )}

                {/* Name */}
                <InputField
                  Icon={Person}
                  id="name"
                  label="Name *"
                  value={tripType === "oneway" ? onewayForm.name : roundForm.name}
                  onChange={(e) =>
                    tripType === "oneway"
                      ? handleChange(setOnewayForm, onewayForm, "name", e.target.value)
                      : handleChange(setRoundForm, roundForm, "name", e.target.value)
                  }
                  error={errors.name}
                />

                {/* Submit Button */}
                <Button className="book-btn" type="submit" disabled={loading}>
                  {loading ? "Processing" : "BOOK NOW"}
                  {loading && (
                    <img
                      src={loadingGif}
                      alt="Loading..."
                      style={{ height: "55px", width: "45px" }}
                    />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Pop-up Message */}
      {popupMsg && (
        <Box
          className={`popup-msg ${
            popupType === "success" ? "popup-success" : "popup-error"
          } popup-show`}
        >
          {popupMsg}
        </Box>
      )}
    </>
  );
}

export default CarTaxiBooking;