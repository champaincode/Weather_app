import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

const API_KEY = "f461493aa4a95ca1c59a3c9bc58f6c8e";


const App = () => {
 
  const [city, setCity] = useState("london");
  

  interface WeatherData {
    main: {
      temp: number;
    };
    name: string;
  }
  const [weather, setWeather] = useState<WeatherData>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get<WeatherData>(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(result.data);
    };

    fetchData();
  }, [city]);

 

  const fetchDataWithGeolocation = async () => {

  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const result = await axios.get<WeatherData>(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setCity(result.data.name);
      setWeather(result.data);
    });
  };

  return (
    <div className="App">
    <input
     placeholder="Search the internet..."
     type="text"
     value={city}
     name="text"
     className="input"
     onChange={(e) => setCity(e.target.value)}

    />
    <button onClick={fetchDataWithGeolocation}>Use my location</button>
    {city && weather ? (
      <div>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>City: {weather.name}</p>
      </div>
    ) : (
      <p>Escribe un Pais o una Ciudad</p>
    )}
  </div>
  );
};

export default App;