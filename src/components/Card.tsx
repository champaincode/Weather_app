import React from "react";
import "./Card.css";
import Clock from "./Clock";

interface Props {
  temperature: number;
  city: string;
}

const Card = ({ temperature, city }: Props) => {
  const tempString = temperature.toFixed(2).toString();
  const tempDisplay = tempString.substring(0, 2);
  return (
    <>
      <div className="card">
        <div className="container">
          <div className="cloud front">
            <span className="left-front"></span>
            <span className="right-front"></span>
          </div>
          <span className="sun sunshine"></span>
          <span className="sun"></span>
          <div className="cloud back">
            <span className="left-back"></span>
            <span className="right-back"></span>
          </div>
        </div>

        <div className="card-header">
          <span>
            {city}
            <br />
          </span>
          <span>
            <Clock></Clock>
          </span>
        </div>

        <span className="temp">{tempDisplay}°</span>

        <div className="temp-scale">
          <span>Celcius</span>
        </div>
      </div>
    </>
  );
};

export default Card;
