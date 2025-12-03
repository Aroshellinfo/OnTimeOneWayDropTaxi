import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import CarTaxiBooking from "./components/Booking/CarTaxiBooking";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import DropTaxi from "./components/Booking/DropTaxi";
import TaxiList from "./components/Taxicard/TaxiList";
import RoutesPage from "./pages/Routes/Routes";
import Contact from "./components/Contact/Contact";
import Contacts from "./components/Contact/Contacts";

import BottomNavBar from "./components/Common/BottomNavBar";
import FloatingButtons from "./components/Common/FloatingButtons";
import Footer from "./components/Common/Footer";

function App() {
  const topRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const whyRef = useRef(null);
  const routesRef = useRef(null);

  const taxiListRef = useRef(null);
  const bookingRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const refreshHome = () => {
    window.location.href = "/";
  };

  
  const HomePage = () => (
    <>
      <div ref={topRef} />

      <HeroSection scrollToBooking={() => scrollToSection(bookingRef)} />

      <div ref={bookingRef} style={{ scrollMarginTop: "140px" }}>
        <CarTaxiBooking />
      </div>

      <div ref={aboutRef}>
        <About scrollToBooking={() => scrollToSection(bookingRef)} />
      </div>

      <div ref={servicesRef}>
        <Services scrollToBooking={() => scrollToSection(bookingRef)} />
      </div>

      <div ref={whyRef}>
        <DropTaxi
          scrollToBooking={() => scrollToSection(bookingRef)}
          scrollToTariff={() => scrollToSection(taxiListRef)}
          scrollToRoutes={() => scrollToSection(routesRef)}
        />
      </div>

      <div ref={taxiListRef}>
        <TaxiList scrollToBooking={() => scrollToSection(bookingRef)}/>
      </div>

      <div ref={routesRef}>
        <RoutesPage scrollToBooking={() => scrollToSection(bookingRef)} />
      </div>

      <Contact scrollToBooking={() => scrollToSection(bookingRef)} />
    </>
  );

  const Tariff = () => (
    <>
      <TaxiList scrollToBooking={() => scrollToSection(bookingRef)}/>
      <Contact />
    </>
  );

  const ContactInfoPage = () => (
    <>
      <Contacts />
      <Contact />
    </>
  );

  const FullBookingPage = () => (
    <>
      <CarTaxiBooking />
      <Contact />
    </>
  );

  return (
    <Router>
      <Header
        scrollTop={refreshHome}
        scrollAbout={() => scrollToSection(aboutRef)}
        scrollServices={() => scrollToSection(servicesRef)}
        scrollWhy={() => scrollToSection(whyRef)}
        scrollRoutes={() => scrollToSection(routesRef)}
        scrollContact={() => scrollToSection(taxiListRef)}
      />

      <BottomNavBar
        scrollTop={refreshHome}
        scrollAbout={() => scrollToSection(aboutRef)}
        scrollServices={() => scrollToSection(servicesRef)}
        scrollWhy={() => scrollToSection(whyRef)}
        scrollRoutes={() => scrollToSection(routesRef)}
        scrollContact={() => scrollToSection(taxiListRef)}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/droptaxi"
          element={
            <DropTaxi
              scrollToBooking={() => scrollToSection(bookingRef)}
              scrollToTariff={() => scrollToSection(taxiListRef)}
              scrollToRoutes={() => scrollToSection(routesRef)}
            />
          }
        />
        <Route path="/tariff" element={<Tariff />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/ContactInfoPage" element={<ContactInfoPage />} />
        <Route path="/book" element={<FullBookingPage />} />
      </Routes>
      <Footer />

      <FloatingButtons />
    </Router>
  );
}

export default App;
