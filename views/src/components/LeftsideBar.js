import React from "react";
import {useState, useEffect} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { useNavigate  } from "react-router-dom"
import Icon from "react-crud-icons";
import '../styles/Leftside.css'






const LeftsideBar=({sendmainstate})=> {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [listItemsup, setListItemsup] = useState([]);

  const [isUpdating, setIsUpdating] = useState('');
  const [isUpdatingup, setIsUpdatingup] = useState('');

  const [updateItemText, setUpdateItemText] = useState('');
  const [updateItemTextup, setUpdateItemTextup] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [visitContent, setVisitContent] = useState(false);
  const [updateDate, setupdateDate] = useState('');

  const user=localStorage.getItem("email");

  
  const addItem = async (e) => {
    e.preventDefault();
    try{
      
      //console.log(itemText)
      
      let formattedDate = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;
    //this.setState({ date: formattedDate });
    console.log(formattedDate);
    const res = await axios.post('http://localhost:3003/todos', {item: itemText, date:formattedDate, email:user});
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
        setListItemsup(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:3003/todos',{email:user})
        
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
  const deleteItemup = async (id) => {
   try{
      const res = await axios.delete(`http://localhost:3003/todos/${id}`)
      const newListItems = listItemsup.filter(item=> item._id !== id);
      setListItemsup(newListItems);
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
  const updateItemup = async (e) => {
    e.preventDefault()
    try{
      let formattedDate = `${
      updateDate.getMonth() + 1
    }/${updateDate.getDate()}/${updateDate.getFullYear()}`
    console.log(formattedDate)
      const res = await axios.put(`http://localhost:3003/todos`, {item: updateItemTextup,id:isUpdatingup,date:formattedDate})
      console.log(res.data)
      const updatedItemIndex = listItemsup.findIndex(item => item._id === isUpdatingup);
      const updatedItem = listItemsup[updatedItemIndex].item = updateItemTextup;
      setUpdateItemTextup('');
      setIsUpdatingup('');
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
  const renderUpdateFormup = () => (
    <form className="update-form" onSubmit={(e)=>{updateItemup(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemTextup(e.target.value)}} value={updateItemTextup} />
      <DatePicker format="MM-dd-y"
      selected={updateDate} 
      onChange={(date) => setupdateDate(date)} isClearable
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
       
        <div className="header">Today's Task</div>
        <div className="content-body">
          
            
        <div className="todo-listItems">
        { 
        Array.isArray(listItems)
        ? listItems.map((item,index)=> ( 
           <div  className={index%2==0? "bck-blue":"bck-white"}>
          <div className="todo-item">
            
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>

                 
                  <p className="item-content">{item.item}</p>
                  <Icon className="todo-icon" name="edit" tooltip="Edit" theme="light" size="medium" onClick={()=>{setIsUpdating(item._id)}}/>
                  <Icon className="todo-icon-del" name="delete" tooltip="Delete" theme="light" size="medium" onClick={()=>{deleteItem(item._id)}}/>
                  
                  <hr className="hr-style" />
                </>
               
            }
            
          </div>
          </div>
          
          ))
        :null}
        </div>
        
        
      </div>
     
      
       
      
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
          Array.isArray(listItemsup)
        ? listItemsup.map((item,index)=> (
          <div  className={index%2==0? "bck-blue":"bck-white"}>
          <div className="todo-item">
            {
              isUpdatingup === item._id
              ? renderUpdateFormup()
              : <>
                  <p className="item-content">{item.item}</p>
                  <div className="tododate">{item.date}</div>
                  <Icon name="edit" tooltip="Edit" theme="light" size="medium" onClick={()=>{setIsUpdatingup(item._id)}}/>
                  <Icon name="delete" tooltip="Delete" theme="light" size="medium" onClick={()=>{deleteItemup(item._id)}}/>
                </>
            }
          </div>
          </div>
          ))
        :null}

        

      </div>
      </div>
       </div>
      </Popup>
    </div>
  );
}

export default LeftsideBar;