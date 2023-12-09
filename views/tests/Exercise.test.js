import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Exercise from "../src/components/Exercise";
import "@testing-library/jest-dom";

// Mocking the CSS file import
jest.mock('../src/styles/Exercise.css', () => ({}));

// Mocking image files
jest.mock('../src/images/Exercise/arm_exercise_1.png', () => ({}));
jest.mock('../src/images/Exercise/arm_exercise_2.png', () => ({}));
jest.mock('../src/images/Exercise/arm_exercise_3.png', () => ({}));
jest.mock('../src/images/Exercise/leg_exercise_1.gif', () => ({}));
jest.mock('../src/images/Exercise/leg_exercise_2.gif', () => ({}));
jest.mock('../src/images/Exercise/fullbody_exercise_1.jfif', () => ({}));
jest.mock('../src/images/Exercise/fullbody_exercise_2.jfif', () => ({}));
jest.mock('../src/images/Exercise/head_exercise.png', () => ({}));

describe("Exercise Component", () => {
    it("Exercise items are available", async () => {
        render(<Exercise />);

        const headExercise = screen.getByText('Head exercise');
        expect(headExercise).toBeInTheDocument();

        const nextButton = screen.getByRole('button', {
            name: /Next/i
        })
        fireEvent.click(nextButton);

        const armExercise1 = screen.getByText('Arm exercise 1');
        expect(armExercise1).toBeInTheDocument();

        fireEvent.click(nextButton);

        const armExercise2 = screen.getByText('Arm exercise 2');
        expect(armExercise2).toBeInTheDocument();

        fireEvent.click(nextButton);

        const armExercise3 = screen.getByText('Arm exercise 3');
        expect(armExercise3).toBeInTheDocument();

        const previousButton = screen.getByRole('button', {
            name: /Previous/i
        })
        fireEvent.click(previousButton);

        const armExercise2Again = screen.getByText('Arm exercise 2');
        expect(armExercise2Again).toBeInTheDocument();
    });

});