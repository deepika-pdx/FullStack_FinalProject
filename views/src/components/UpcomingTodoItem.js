import React from 'react';
import { useState } from "react";
import Popup from "reactjs-popup";
import Icon from "react-crud-icons";
import DatePicker from "react-datepicker";
import axios from "axios";

//Functional component for rendering upcoming todo items

const UpcomingTodoItem = (props) => {
  const [open, setOpen] = useState(false);
  const [isUpdatingup, setIsUpdatingup] = useState('');
  const [updateItemTextup, setUpdateItemTextup] = useState('');
  const [updateDate, setupdateDate] = useState('');

  const closeModal = () => setOpen(false);

  const renderUpdateFormup = () => (
    // Update form for the todo items
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItemup(e, !open);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemTextup(e.target.value);
        }}
        value={updateItemTextup}
      />
      <DatePicker
        name="Select a date"
        format="MM-dd-y"
        selected={updateDate}
        onChange={(date) => setupdateDate(date)}
        isClearable
        popperClassName="some-custom-class"
        popperPlacement="top-end"
        minDate={new Date()}
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [5, 10],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              rootBoundary: 'viewport',
              tether: false,
              altAxis: true,
            },
          },
        ]}
      />
      <div className="buttons-todo">
        <button className="update-new-btn" type="submit">
          Update
        </button>
      </div>
    </form>
  );

  //Function to delete a todo item from the list
  const deleteItemup = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      const newListItems = props.listItemsup.filter((item) => item._id !== id);
      props.setListItemsup(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  //Function to update a todo item with date in the todo list

  const updateItemup = async (e, open) => {
    e.preventDefault();
    try {
      const dateup = updateDate.toString();
      console.log('updated date');
      console.log(dateup);
      if (updateItemTextup.length !== 0 && dateup.length !== 0) {
        let formattedDate = `${
          updateDate.getMonth() + 1
        }/${updateDate.getDate()}/${updateDate.getFullYear()}`;
        console.log(formattedDate);
        const res = await axios.put(`/todos`, {
          item: updateItemTextup,
          id: isUpdatingup,
          date: formattedDate,
        });
        console.log(res.data);
        const updatedItemIndex = props.listItemsup.findIndex(
          (item) => item._id === isUpdatingup
        );
        props.listItemsup[updatedItemIndex].item = updateItemTextup;
        props.listItemsup[updatedItemIndex].date = formattedDate;
        setUpdateItemTextup('');
        setIsUpdatingup('');
        setupdateDate('');
      } else if (dateup.length === 0) {
        alert('Please enter valid date for update');
        setOpen(!open);
      } else if (updateItemTextup.length !== 0) {
        alert('Please enter some value in the todo if you want to edit');
        setOpen(!open);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodoup = async (id) => {
    const data = await fetch('/todo/complete/' + id).then((res) => res.json());

    props.setListItemsup((listItemsup) =>
      listItemsup.map((item) => {
        if (item._id === data._id) {
          item.complete = data.complete;
        }
        return item;
      })
    );
  };

  return (
    <>
      <div className="buttons-todo">
        <button class="button" onClick={() => setOpen((o) => !o)}>
          Upcoming tasks
        </button>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} modal nested>
        <div className="modal">
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <div className="content">
            <div className="todo-listItems">
              {Array.isArray(props.listItemsup)
                ? props.listItemsup.map((item, index) => (
                    <div className={index % 2 === 0 ? 'bck-blue' : 'bck-white'}>
                      <div className="todo-item">
                        {' '}
                        {isUpdatingup === item._id ? (
                          renderUpdateFormup()
                        ) : (
                          <>
                            <div
                              className={
                                'todo' + (item.complete ? ' is-complete' : '')
                              }
                              key={item._id}
                              onClick={() => completeTodoup(item._id)}
                            >
                              {' '}
                              <div className="todocheckbox"></div>
                            </div>
                            <p className="text item-content">{item.item}</p>
                            <div className="tododate">{item.date}</div>
                            <Icon
                              className="todo-icon"
                              name="edit"
                              tooltip="Edit"
                              theme="light"
                              size="medium"
                              onClick={() => {
                                setIsUpdatingup(item._id);
                              }}
                            />
                            <Icon
                              className="todo-icon-del"
                              name="check"
                              tooltip="Done"
                              theme="light"
                              size="medium"
                              onClick={() => {
                                deleteItemup(item._id);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default UpcomingTodoItem;
