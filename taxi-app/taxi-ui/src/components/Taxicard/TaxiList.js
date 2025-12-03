import React from "react";
import taxiData from "../../constants/taxiData";

export default function TariffPage({ scrollToBooking }) {
  const handleBookNowClick = () => {
    if (scrollToBooking) {
      scrollToBooking();
    }
  };

  return (
    <>
      <style>{`
  .tariffPage{
    padding: 20px 10px;
    text-align: center;
    width:90%;
    margin-left:70px;
  }
  .subHeading{
    font-size: 25px;
    font-weight: 700;
    margin-top: 5px;
    color: #2d2d2d;
  }
  .tariffContainer{
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
  }
  .tariffCard{
    width: 23.4%;
    paddingLeft:20px,
    background: #f4f4f4;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    border: 1px solid #ddd;
    text-align: left;
    overflow: hidden; /* ensures image doesn't escape corners */
    display: flex;
    flex-direction: column;
  }
  .imageBox{
  position: relative;
  width: 100%;
  height: 200px; /* FIXED HEIGHT for ALL images */
  overflow: hidden; /* Keeps image inside the box */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.carImage{
  width: 100%;
  height: 100%;
  object-fit: cover; /
  display: block;
}

  .popularTag{
    position: absolute;
    top: 10px;
    right: 10px;
    background: black;
    color: white;
    padding: 4px 10px;
    font-size: 14px;
    border-radius: 0 0 0 10px;
    font-weight: 600;
  }
  .priceBadge{
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color:#126839;
    color: white;
    padding: 8px 16px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 4px;
  }
  .pricePerKm{
    position: absolute;
    bottom: 20px;
    right: 10px;
    font-size: 14px;
    color: black;
    font-weight: 700;
  }
  .carTitle{
    margin: 20px 15px 0 15px;
    font-size: 24px;
    font-weight: 700;
    color: black;
  }
  .tripType{
    font-size: 16px;
    margin: 5px 15px;
    color: #555;
    font-weight: 500;
  }
  .featureList{
    margin: 10px 15px;
    padding-left: 3px;
    line-height: 28px;
    font-size: 16px;
    list-style: none;
  }
  .featureList li{
    position: relative;
    padding-left: 28px;
    margin-bottom: 6px;
    font-size: 15px;
    color: #444;
  }
  .featureList li::before{
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    color: #126839;
    font-weight: bold;
    font-size: 18px;
  }
  .bookBtn{
    width: 200px;
    padding: 16px 0;
    background: #126839;
    color: white;
    border: none;
    border-radius: 20px 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    margin: 20px auto;
    transition: 0.3s ease;
  }
  .bookBtn:hover{
    background-color: black;
  }
  .tariffCard:hover{
    border-color: green;
    background-color: #f7f7f7;
  }
`}</style>

      <div className="tariffPage">
        <h1 className="subHeading">Our Tariff</h1>

        <div className="tariffContainer">
          {taxiData.map((car, index) => (
            <div className="tariffCard" key={index}>
              <div className="imageBox">
                <img src={car.image} alt={car.title} className="carImage" />
                <span className="popularTag">Popular</span>
                <div className="priceBadge">Rs. {car.price}</div>
                <span className="pricePerKm">per km</span>
              </div>
              <h2 className="carTitle">{car.title}</h2>
              <p className="tripType">One Way</p>
              <ul className="featureList">
                {car.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <button className="bookBtn" onClick={handleBookNowClick}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
