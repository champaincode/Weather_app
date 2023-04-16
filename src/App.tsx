import React, { useState, useEffect } from "react";
import axios from "axios";
import alaska from "./alaska.jpg";
import londres from "./londres.jpg";
import caluroso from "./caluroso.jpg";
import templado from "./templado.jpg";
import Card from "./components/Card";
import "./App.css";
import Clock from "./components/Clock";

const API_KEY = "f461493aa4a95ca1c59a3c9bc58f6c8e";

const App = () => {
  const [city, setCity] = useState("Argentina");

  interface WeatherData {
    main: {
      temp: number;
    };
    name: string;
  }
  const [weather, setWeather] = useState<WeatherData>();
  console.log(weather);

  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(result);
      setWeather(result.data);
      if (result.data) {
        if (result.data.main.temp >= 29) {
          setBackgroundImage(`url(${caluroso})`);
        } else if (result.data.main.temp >= 20 && result.data.main.temp < 30) {
          setBackgroundImage(`url(${templado})`);
        } else if (result.data.main.temp === 0 || result.data.main.temp < -1) {
          setBackgroundImage(`url(${alaska})`);
        } else {
          setBackgroundImage(`url(${londres})`);
        }
      }
    };

    fetchData();
  }, [city]);

  const fetchDataWithGeolocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const result = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setCity(result.data.name);
      setWeather(result.data);
    });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="containerInput ">
        <input
          placeholder="Write a County or a City..."
          type="text"
          value={city}
          name="text"
          className="inputClima"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {city && weather && (
        <Card temperature={weather.main.temp} city={weather.name} />
      )}
      <button onClick={fetchDataWithGeolocation}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Use my location
      </button>
    </div>
  );
};

export default App;
