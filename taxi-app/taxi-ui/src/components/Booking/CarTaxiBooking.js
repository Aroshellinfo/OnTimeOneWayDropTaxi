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
    return (
        <Box className="form-group floating-group">
            <Box className="input-icon">
                <Icon />
                <input
                    id={id}
                    ref={inputRef}
                    type={type}
                    value={value || ""}
                    onChange={onChange}
                    placeholder=""
                    autoComplete="off"
                    className={value ? "has-content" : ""}
                    onFocus={(e) => {
                        e.target.classList.add("has-content-on-focus");
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            e.target.classList.remove("has-content-on-focus");
                        }
                    }}
                />
                <label htmlFor={id} className="floating-label">
                    {label}
                </label>
            </Box>
            {error && (
                <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
            )}
        </Box>
    );
};

function CarTaxiBooking() {
    const [tripType, setTripType] = useState("oneway");
       const [selectedCar, setSelectedCar] = useState(CAR_DATA[0].name);

    const pickupRef = useRef(null);
    const dropRef = useRef(null);

    const [, setPickupSelected] = useState(false);
    const [, setDropSelected] = useState(false);

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

        return () => {
            document.body.removeChild(script);
        };
    }, [tripType]);

    const handleChange = (setter, state, field, value) => {
        setter({ ...state, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const showPopup = (msg, type) => {
        setPopupMsg(msg);
        setPopupType(type);
        setTimeout(() => setPopupMsg(""), 3000);
    };

    const validateFields = () => {
        const formData = tripType === "oneway" ? onewayForm : roundForm;
        const newErrors = {};

        if (!formData.pickup) newErrors.pickup = "Please enter pickup location";
        if (!formData.drop) newErrors.drop = "Please enter drop location";
        if (!formData.pickupDate) newErrors.pickupDate = "Please select pickup date";
        if (!formData.pickupTime) newErrors.pickupTime = "Please select pickup time";
        if (!formData.name) newErrors.name = "Please enter your name";
        if (!formData.email) newErrors.email = "Please enter valid email";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
        if (!formData.mobile) newErrors.mobile = "Please enter phone number";
        else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Please enter a valid phone number";

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

        if (!validateFields()) {
            setLoading(false);
            return;
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
            <style>{`
            *, *::before, *::after {
                box-sizing: border-box;
            }
            html, body {
                width: 100%;
                margin: 0; 
                padding: 0;
            }
            body { 
              font-family: Arial; 
              background:#f5f5f5; 
            }
            .center-wrapper { 
                width: 100%; 
            } 
            .common { 
                max-width:900px; 
                width: 100%;
                margin:auto; 
                padding:0;
            }
            .oneway { margin-top:20px; text-align:center; }
            .oneway button { padding:10px 30px; font-size:14px; background:#f0f0f0; border:none; cursor:pointer; }
            .oneway .active { background:#e9eeebff; border-top:2px solid #126839; color:#126839; }
            .form-wrapper { 
              background:#E6F6F0; 
              border:2px solid #126839; 
              padding: 17px 20px; 
              border-radius:12px; 
            }
            .form-container { display:flex; gap:40px; flex-wrap:wrap; }
            .form-left, .form-right { flex:1; min-width:300px; } 
            .input-icon { 
              display:flex; 
              align-items:center; 
              background:#fff; 
              border:1px solid #ccc; 
              border-radius:12px; 
              padding: 18px 10px 8px 10px; 
              position: relative;
              transition: border-color 0.2s ease-out;
            }
            .input-icon:focus-within {
              border-color: #126839; 
              border-width: 2px;
            }
            .input-icon input { 
              border:none; 
              width:100%; 
              outline:none; 
              font-size:16px; 
              margin-left: 8px; 
              z-index: 1;
            }
            .floating-group {
              margin-bottom: 20px;
              position: relative; 
            }
            .floating-label {
              position: absolute;
              top: 50%; 
              left: 45px; 
              transform: translateY(-50%);
              color: #999;
              transition: 0.2s ease-out;
              pointer-events: none; 
              font-size: 16px;
              z-index: 2;
              background: transparent;
              padding: 0;
            }
            .input-icon input:focus ~ .floating-label,
            .input-icon input.has-content ~ .floating-label,
            .input-icon input.has-content-on-focus ~ .floating-label {
              top: 0px; 
              left: 40px; 
              transform: translateY(-50%);
              font-size: 14px;
              color: #126839; 
              background: #E6F6F0; 
              padding: 0 4px; 
              z-index: 3;
            }
            .input-icon input[type="date"],
            .input-icon input[type="time"] {
                color: #000;
            }
            .input-icon input[type="date"].has-content ~ .floating-label,
            .input-icon input[type="time"].has-content ~ .floating-label {
                top: 0px;
                left: 40px; 
                transform: translateY(-50%);
                font-size: 14px;
                color: #126839;
                background: #E6F6F0;
                padding: 0 4px;
                z-index: 3;
            }

            .input-icon input[type="date"]::-webkit-datetime-edit {
                color: transparent;
            }
            .input-icon input[type="date"]:focus::-webkit-datetime-edit,
            .input-icon input[type="date"].has-content::-webkit-datetime-edit {
                color: #000;
            }
            
.input-icon input[type="time"]::-webkit-datetime-edit-fields-wrapper {
    display: none;
}

.input-icon input[type="time"]::-webkit-datetime-edit-text {
    display: none;
}

.input-icon input[type="time"]::-webkit-datetime-edit-hour-field,
.input-icon input[type="time"]::-webkit-datetime-edit-minute-field {
    display: none;
}


            .car-selection { display:flex; justify-content:space-between; margin-bottom:20px; }
            .car { flex:1; padding:5px; cursor:pointer; margin:0 5px; border:2px solid transparent; text-align:center; border-radius:11px}
            .car.selected { border-color:#126839; background:white; }
            .car img { width:80px; height:60px; object-fit:contain; }
            .car-rate { color:red; font-weight:bold; }
            .book-btn { width:100%; background:#126839; color:white; padding:10px; height:48px; font-size:20px; border-radius:10px; margin-top:20px; }
            .book-btn:disabled { background:gray; cursor:not-allowed; }
            .popup-msg { padding:10px; border-radius:8px; margin-top:10px; font-size:15px; text-align:center; }
            .popup-success { background:#c7f9cc; color:#126839; }
            .popup-error { background:#ffcccc; color:#b30000; }
            @media (max-width: 768px) {
                .common {
                    padding: 0 10px; 
                }
                .form-container {
                    flex-direction: column;
                    gap: 0; 
                }
                .form-left, .form-right {
                    width: 100%;
                    min-width: unset; 
                }
                .car-selection { 
                    justify-content: space-around;
                    margin-left: -5px; 
                    margin-right: -5px;
                }
                .car {
                    margin: 0 2px; 
                }
                .car img {
                    width: 60px; 
                    height: 40px;
                }
                .car .MuiTypography-root:first-of-type { 
                    font-size: 12px; 
                }
                .car-rate { 
                    font-size: 10px;
                }
            }
            `}</style>

            <Box className="center-wrapper">
                <Box className="common">
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
                    <Box
                        className="form-wrapper"
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Box className="form-container">
                            <Box className="form-left">
                                <Box className="car-selection">
                                    {CAR_DATA.map((car) => (
                                        <Box
                                            key={car.name}
                                            className={`car ${selectedCar === car.name ? "selected" : ""}`}
                                            onClick={() => setSelectedCar(car.name)}
                                        >
                                            <img src={car.image} alt={car.name} />
                                            <Typography>{car.name}</Typography>
                                            <Typography className="car-rate">{car.rate}</Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <InputField
                                    Icon={Place}
                                    id="pickup-location"
                                    label="Pick-up Location *"
                                    inputRef={pickupRef}
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
                                    label="Pick-up Date *"
                                    type="date"
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
                                        label="Return Date *"
                                        type="date"
                                        value={roundForm.returnDate}
                                        onChange={(e) =>
                                            handleChange(setRoundForm, roundForm, "returnDate", e.target.value)
                                        }
                                        error={errors.returnDate}
                                    />
                                )}

                                <InputField
                                    Icon={Smartphone}
                                    id="mobile"
                                    label="Mobile *"
                                    type="tel"
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

                            <Box className="form-right">
                                <InputField
                                    Icon={Email}
                                    id="email"
                                    label="Email *"
                                    type="email"
                                    value={tripType === "oneway" ? onewayForm.email : roundForm.email}
                                    onChange={(e) =>
                                        tripType === "oneway"
                                            ? handleChange(setOnewayForm, onewayForm, "email", e.target.value)
                                            : handleChange(setRoundForm, roundForm, "email", e.target.value)
                                    }
                                    error={errors.email}
                                />

                                <InputField
                                    Icon={Place}
                                    id="drop-location"
                                    label="Drop Location *"
                                    inputRef={dropRef}
                                    value={tripType === "oneway" ? onewayForm.drop : roundForm.drop}
                                    onChange={(e) =>
                                        tripType === "oneway"
                                            ? handleChange(setOnewayForm, onewayForm, "drop", e.target.value)
                                            : handleChange(setRoundForm, roundForm, "drop", e.target.value)
                                    }
                                    error={errors.drop}
                                />

                                <InputField
                                    Icon={Schedule}
                                    id="pickup-time"
                                    label="Pick-up Time *"
                                    type="time"
                                    value={tripType === "oneway" ? onewayForm.pickupTime : roundForm.pickupTime}
                                    onChange={(e) =>
                                        tripType === "oneway"
                                            ? handleChange(setOnewayForm, onewayForm, "pickupTime", e.target.value)
                                            : handleChange(setRoundForm, roundForm, "pickupTime", e.target.value)
                                    }
                                    error={errors.pickupTime}
                                />

                                {tripType === "round" && (
                                    <InputField
                                        Icon={Schedule}
                                        id="return-time"
                                        label="Return Time *"
                                        type="time"
                                        value={roundForm.returnTime}
                                        onChange={(e) =>
                                            handleChange(setRoundForm, roundForm, "returnTime", e.target.value)
                                        }
                                        error={errors.returnTime}
                                    />
                                )}

                                <Box className="form-group" style={{ marginBottom: errors.name ? "0px" : "20px" }}>
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
                                </Box>

                                <Button className="book-btn" type="submit" disabled={loading}>
                                    {loading ? "Processing..." : "BOOK NOW"}
                                </Button>

                                {popupMsg && (
                                    <Box className={`popup-msg ${popupType === "success" ? "popup-success" : "popup-error"}`}>
                                        {popupMsg}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default CarTaxiBooking;
