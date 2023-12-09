import React from 'react';
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import RightsideBar from "../src/components/RightsideBar";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

const testThoughts = [
    {
      _id: 1,
      thought: '“Happiness cannot be traveled to, owned, earned, worn or consumed. Happiness is the spiritual experience of living every minute with love, grace, and gratitude.” — Denis Waitley'
    },
    {
      _id: 2,
      thought: '“Don’t let yesterday take up too much of today.” — Will Rogers'
    },
    {
      _id: 3,
      thought: '“Rivers know this: there is no hurry. We shall get there some day.” ―A.A. Milne'
    },
    {
      _id: 4,
      thought: '“If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.” — Steve Jobs'
    },
    {
      _id: 5,
      thought: '“Pray as though everything depended on God. Work as though everything depended on you.” — Saint Augustine'
    },
    {
      _id: 6,
      thought: '“To know how much there is to know is the beginning of learning to live.” —Dorothy West'
    },
    {
      _id: 7,
      thought: "“You've got to get up every morning with determination if you're going to go to bed with satisfaction.” — George Lorimer"
    },
    {
      _id: 8,
      thought: '“Coming together is a beginning. Keeping together is progress. Working together is success.” — Henry Ford'
    },
    {
      _id: 9,
      thought: '“Everything is a gift of the universe--even joy, anger, jealously, frustration, or separateness. Everything is perfect either for our growth or our enjoyment.” — Ken Keyes Jr.'
    },
    {
      _id: 10,
      thought: '“When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love…” – Marcus Aurelius'
    }
  ]

// Mocking the CSS file import
jest.mock('../src/styles/RightsideBar.css', () => ({}));
jest.mock('../src/styles/NearbyEvents.css', () => ({}));

describe("RightsideBar Component", () => {
    it("Checking if thoughts are displayed", async () => {
        axios.get.mockResolvedValue({ data: testThoughts });
        render(<RightsideBar />);
  
        const thoughts = await waitFor(() => document.querySelectorAll('.thoughtClass'));
        expect(thoughts).toHaveLength(1);
    });
  
    it("Checking events heading is displayed", () => {
        render(<RightsideBar />);
  
        const eventsHeadingElement = screen.getByText('Events Around Us!!');
        expect(eventsHeadingElement).toBeInTheDocument();
    });

    it("Checking if all the events are listed", () => {
        render(<RightsideBar />);
  
        const eventsList = document.querySelectorAll('.accordion-item');
        expect(eventsList).toHaveLength(4);
    });

    it("Checking if event details is displayed on selecting an event", () => {
        render(<RightsideBar />);
        
        const accordianContentList = document.querySelectorAll('.accordion-content');
        expect(accordianContentList).toHaveLength(0);

        const expandAccordianContent = screen.getAllByText('+')[0];
        fireEvent.click(expandAccordianContent);

        const expandedAccordianContentList = document.querySelectorAll('.accordion-content');
        expect(expandedAccordianContentList).toHaveLength(2);

        const collapseAccordianContent = screen.getAllByText('-')[0];
        fireEvent.click(collapseAccordianContent);

        const collapsedAccordianContentList = document.querySelectorAll('.accordion-content');
        expect(collapsedAccordianContentList).toHaveLength(0);
    });
});