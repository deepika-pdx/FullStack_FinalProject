import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FunActivities from "../src/components/FunActivities";
import "@testing-library/jest-dom";

// Mocking the CSS file import
jest.mock('../src/styles/FunActivities.css', () => ({}));

// Mocking image files
jest.mock('../src/images/Fun_Activities/fun_icon.png', () => ({}));
jest.mock('../src/images/Fun_Activities/lets_paint_icon.png', () => ({}));
jest.mock('../src/images/Fun_Activities/jigsaw_puzzle_icon.png', () => ({}));
jest.mock('../src/images/Fun_Activities/books_and_coffee_icon2.jpg', () => ({}));
jest.mock('../src/images/Fun_Activities/dance_icon.jpg', () => ({}));
jest.mock('../src/images/Fun_Activities/music_icon.jfif', () => ({}));
jest.mock('../src/images/Fun_Activities/recipe_icon.png', () => ({}));

jest.mock('@material-ui/core/Tooltip');

describe("FunActivities Component", () => {
    it("FunActivities items are available", async () => {
        render(<FunActivities />);

        const funActivitiesHeading = document.querySelectorAll('h3');
        expect(funActivitiesHeading).toHaveLength(1);

        const atags = document.querySelectorAll('a');
        expect(atags).toHaveLength(6);

        expect(atags[0]).toHaveAttribute('href', 'https://www.autodraw.com/');
    });

});