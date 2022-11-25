import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Icon from "react-crud-icons";




const Content =({mainstate=true})=> {
   const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [visitContent, setVisitContent] = useState(false);



  
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:3003/todos')
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
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content">{item.item}</p>
                  <Icon name="edit" tooltip="Edit" theme="light" size={0} onClick={()=>{setIsUpdating(item._id)}}/>
                  <Icon name="delete" tooltip="Delete" theme="light" size={0} onClick={()=>{deleteItem(item._id)}}/>
                </>
            }
          </div>
          ))
        }     
      </div>
      </div>
      
  );
}


export default Content;