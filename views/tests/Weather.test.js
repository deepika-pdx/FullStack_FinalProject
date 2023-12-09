import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Weather from "../src/components/Weather";
import "@testing-library/jest-dom";

// Mocking the CSS file import
jest.mock('../src/styles/Weather.css', () => ({}));

const testWeatherDataMock = {
    "coord": {
        "lon": -122.8831,
        "lat": 45.5397
    },
    "weather": [
        {
            "id": 741,
            "main": "Fog",
            "description": "fog",
            "icon": "50n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 3.61,
        "feels_like": 2.59,
        "temp_min": 2.02,
        "temp_max": 5.38,
        "pressure": 1030,
        "humidity": 94
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.34,
        "deg": 44,
        "gust": 1.34
    },
    "clouds": {
        "all": 0
    },
    "dt": 1702092522,
    "sys": {
        "type": 2,
        "id": 2007193,
        "country": "US",
        "sunrise": 1702049935,
        "sunset": 1702081691
    },
    "timezone": -28800,
    "id": 5749017,
    "name": "Rockcreek",
    "cod": 200
}

describe("Weather Component", () => {
    it("Weather items are available", async () => {
       
        render(<Weather weatherData={testWeatherDataMock}/>);

        const locationText = screen.getByText('Location: Rockcreek');
        expect(locationText).toBeInTheDocument();

        const weatherText = screen.getByText('Weather: Fog');
        expect(weatherText).toBeInTheDocument();

    });

});