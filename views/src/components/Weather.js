import React from "react";
import '../styles/Weather.css';

const Weather = ({weatherData}) => (
  <div className="card" >
    <div className="content">
      <div className="front">
      <p >Location: {weatherData.name}</p> 
        <p >Current Weather: {weatherData.weather[0].main}</p>
        <p >Description: {weatherData.weather[0].description}</p>
        <p >Temperature: {(weatherData.main.temp).toFixed(1)} &deg;C</p>
      </div>
      <div className="back">
        <p >Feels-like: {(weatherData.main.feels_like).toFixed(1)} &deg;C</p>
        <p >Humidity: {weatherData.main.humidity} %</p>
        <p >Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p >Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
      </div>
      </div>
  </div>
)

export default Weather;