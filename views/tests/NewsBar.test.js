import React from 'react';
import { render, waitFor } from "@testing-library/react";
import NewsBar from "../src/components/NewsBar";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

const testNews = {
        "data": [
            {
                "article_id": "dce7172e2844f134a22ba14d4c9e9bdd",
                "title": "Test News 1",
            },
            {
                "article_id": "588f52071c509bd9baae4e734ceec922",
                "title": "Test News 2",
            },
            {
                "article_id": "d33116b27ff9bf6291cee7a1ab375b03",
                "title": "Test News 3",
            },
        ]
    }

// Mocking the CSS file import
jest.mock('../src/styles/NewsBar.css', () => ({}));

describe("NewsBar Component", () => {
    it("News items are available", async () => {
        axios.get.mockResolvedValueOnce(testNews);
        render(<NewsBar />);

        await waitFor(() => {
            const newsList = document.querySelectorAll('.newsSpan');
            expect(newsList).toHaveLength(3);
          });
    });

});