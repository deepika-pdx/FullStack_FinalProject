/** @format */

import React from 'react';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'reactjs-popup/dist/index.css';
import '../styles/TodoItems.css';
import AddTodoItem from './AddTodoItem';
import UpdateTodoItem from './UpdateTodoItem';
import UpcomingTodoItem from './UpcomingTodoItem';

//This components displays the todo items including AddTodoItems, UpdateTodoItems and UpcomingTodoItems.

const TodoItems = () => {
  const [listItems, setListItems] = useState([]);
  const [listItemsup, setListItemsup] = useState([]);
  const user = localStorage.getItem('email');

  useEffect(() => {
    const getItemsList = async () => {
      fetch(
        '/todostomorrow?' +
          new URLSearchParams({
            email: user,
          })
      )
        .then((res) => res.json())
        .then((data) => setListItemsup(data))
        .catch((err) => console.error('Error: ', err));
    };

    getItemsList();
  }, [user]);

  useEffect(() => {
    const getTodos = async () => {
      fetch(
        '/todos?' +
          new URLSearchParams({
            email: user,
          })
      )
        .then((res) => res.json())
        .then((data) => setListItems(data))
        .catch((err) => console.error('Error: ', err));
    };
    getTodos();
  }, [user]);

  return (
    <div className="leftside">
      <AddTodoItem
        user={user}
        setListItems={setListItems}
        setListItemsup={setListItemsup}
      ></AddTodoItem>
      <UpdateTodoItem
        listItems={listItems}
        setListItems={setListItems}
      ></UpdateTodoItem>
      <UpcomingTodoItem
        listItemsup={listItemsup}
        setListItemsup={setListItemsup}
      ></UpcomingTodoItem>
    </div>
  );
};

export default TodoItems;
