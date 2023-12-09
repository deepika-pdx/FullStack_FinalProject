import React from 'react';
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import TodoItems from "../src/components/TodoItems";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

const testTodos = [
    {
    item: 'Complete CRR project', 
    date: '12/8/2023', 
    email: 'velapure@pdx.edu', 
    complete: false, 
    _id: 1, 
    __v: 0}
    ];

// Mocking the CSS file import
jest.mock('../src/styles/TodoItems.css', () => ({}));
jest.mock('react-datepicker/dist/react-datepicker.css', () => ({}));
jest.mock('reactjs-popup/dist/index.css', () => ({}));

let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: testTodos }),
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

describe("TodoItems Component", () => {
    it("Task and date are available for adding todo item", () => {
        render(<TodoItems />);

        const addTodoTask = screen.getAllByLabelText('Task')
        const addTodoDate = screen.getAllByLabelText('Date:')
        const addTodoItems = [addTodoTask, addTodoDate]
        expect(addTodoItems).toHaveLength(2);
    });
  
    it("Checking if todo item can be added", async () => {
        render(<TodoItems />);

        const todoTask = screen.getByPlaceholderText('Add Todo Item');
        fireEvent.change(todoTask, { target: { value: 'Complete CRR Project Report' } });

        const datePickerInput = screen.getByLabelText('Date:')
        fireEvent.focus(datePickerInput);

        const selectedDate = new Date().toLocaleDateString();
        fireEvent.change(datePickerInput, { target: { value: selectedDate } });

        const todoItem = { item: 'Complete CRR Project Report', 
        date: '12/8/2023', email: null }
        const response = { data: { success: true } };

        axios.post.mockResolvedValue(response);

        const submitButton = screen.getByText('Add');
        fireEvent.click(submitButton);

        expect(axios.post).toHaveBeenCalledWith('/todos', todoItem);
    });

    it("Checking if appropriate text is displayed when there are no todo tasks", async () => {
        render(<TodoItems />);

        const noTodoTaskText = document.querySelectorAll('.todo-no-tasks');
        expect(noTodoTaskText).toHaveLength(1);
    });

    it("Checking if appropriate text is displayed when there are no upcoming tasks", async () => {
        render(<TodoItems />);

        const upcomingTodoTaskButton = screen.getAllByRole('button', {
            name: /Upcoming tasks/i
        });
        expect(upcomingTodoTaskButton).toHaveLength(1);

        fireEvent.click(upcomingTodoTaskButton[0]);

        const noUpcomingTasksText = document.querySelectorAll('.todo-no-upcoming-tasks');
        expect(noUpcomingTasksText).toHaveLength(1);
    });
    
});