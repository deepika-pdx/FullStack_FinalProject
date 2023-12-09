import React from 'react';
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import WaterTracker from "../src/components/WaterTracker";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

// Mocking the CSS file import
jest.mock('../src/styles/WaterTracker.css', () => ({}));

// Mocking image files
jest.mock('../src/images/WaterTracker/water_icon.png', () => ({}));
jest.mock('../src/images/WaterTracker/empty_glass_icon.svg', () => (<p>Empty glass</p>));
jest.mock('../src/images/WaterTracker/full_glass_icon.svg', () => ({}));

jest.mock('reactjs-popup');

const testWaterTrackerData = {
    "data": 
        {
            "waterGlassCount": 0,
        },
    "status" : 200
}

const testFullGlassData = {
    email: "velapure@pdx.edu",
    waterGlassCount : 1
}

describe("WaterTracker Component", () => {
    it("Water Tracker section is displayed", () => {
        render(<WaterTracker />);

        const waterTrackerHeading = document.querySelectorAll('h3');
        expect(waterTrackerHeading).toHaveLength(1);
    });

    it("Drink water button exists", () => {
        render(<WaterTracker />);

        const drankWaterButton = screen.getAllByRole('button', {
            name: /Yes, I just had a glass of water./i
        })
        expect(drankWaterButton).toHaveLength(1);
    });

    it("Initial Glass count", async () => {
        axios.post.mockResolvedValueOnce(testWaterTrackerData);
        render(<WaterTracker />);

        await waitFor(() => {
            const emptyGlasses = screen.getAllByAltText('empty glass icon');
            expect(emptyGlasses).toHaveLength(8);
          });
    });
    
});