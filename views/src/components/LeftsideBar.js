/** @format */

import React from "react";
import {useState, useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Content from "./Content";
import { useNavigate  } from "react-router-dom"
import Icon from "react-crud-icons";






const LeftsideBar=({sendmainstate})=> {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [visitContent, setVisitContent] = useState(false);



  const addItem = async (e) => {
    e.preventDefault();
    try{
      
      //console.log(itemText)
      
      let formattedDate = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
    //this.setState({ date: formattedDate });
    console.log(formattedDate);
    const res = await axios.post('http://localhost:3003/todos', {item: itemText, date:formattedDate});
    sendmainstate(true)
    setListItems(prev => [...prev, res.data]);
      setItemText('');
      setVisitContent(true);
      //navigate(`/Main.js`)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:3003/todostomorrow')
        setListItems(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);

  // Delete item when click on delete
  const deleteItem = async (id) => {
   try{
      const res = await axios.delete(`http://localhost:3003/todos/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }

  //Update item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:3003/todos`, {item: updateItemText,id:isUpdating})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  return (
   
    <div className="App">
      <h2>Todo List</h2>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <DatePicker format="MM-dd-y"
      selected={startDate}
      onChange={(date) => setStartDate(date)} isClearable
      popperClassName="some-custom-class"
      popperPlacement="top-end"
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [5, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
    />
        
        <button type="submit">Add</button>
        
      </form>
       <Popup
    trigger={<button className="button"> View upcoming schedule </button>}
    modal
    nested
  >
    
      <div className="modal">
        
        <div className="header">Upcoming Scheduled Tasks:</div>
        
      <div className="content">
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content">{item.item}</p>
                  <Icon name="edit" tooltip="Edit" theme="light" size="medium" onClick={()=>{setIsUpdating(item._id)}}/>
                  <Icon name="delete" tooltip="Delete" theme="light" size="medium" onClick={()=>{deleteItem(item._id)}}/>
                </>
            }
          </div>
          ))
        }

        

      </div>
      </div>
       </div>
      </Popup>
    </div>
  );
}

export default LeftsideBar;
