import React from 'react';
import { render, screen } from "@testing-library/react";
import DateTime from "../src/components/DateTime";
import "@testing-library/jest-dom";

// Mocking the CSS file import
jest.mock('../src/styles/TopBar.css', () => ({}));

describe("DateTime Component", () => {
  it("Checking date and time are displayed", () => {
    render(<DateTime />);

    const dateElements = screen.getAllByText(/(Today's Date|Current Time)/i);
    expect(dateElements.length).toBe(2);
  });

  it("Checking if date displayed is correct", () => {
    render(<DateTime />);

    const today = new Date().toLocaleDateString();
    const todayDateElement = screen.getByText(`Today's Date : ${today}`);

    expect(todayDateElement).toBeInTheDocument();
  });
});