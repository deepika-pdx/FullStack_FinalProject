import React from "react";
import '../styles/Weather.css';
import weather from "../images/Weather/Weather.png";

const Weather = ({weatherData}) => (
  <div className="card">
    
    <div className="content">
    <img src={weather} alt="weather" width="60" height="60"></img>
     <div>
      <p ><b>Location: {weatherData.name}</b></p> 
        <p >Weather: {weatherData.weather[0].main}</p>
        <p >Temperature: {(weatherData.main.temp).toFixed(1)} &deg;C</p>
        <p >Humidity: {weatherData.main.humidity} %</p>
        </div>
      </div>
     </div>  
     
   
     
);

export default Weather;