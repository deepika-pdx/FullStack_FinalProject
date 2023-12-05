import Icon from "react-crud-icons";
import { useState } from "react";
import axios from "axios";

const UpdateTodoItem = (props) => {
    const [isUpdating, setIsUpdating] = useState("");
    const [updateItemText, setUpdateItemText] = useState("");
    const [open, setOpen] = useState(false);

    //before updating item we need to show input field where we will create our updated item
    const renderUpdateForm = () => (
        <form className="update-form" onSubmit={(e) => { updateItem(e, open); }}>
            <input className="update-new-input" type="text" placeholder="New Item"
                onChange={(e) => { setUpdateItemText(e.target.value); }} value={updateItemText} />
            <button className="update-new-btn" type="submit">
                Update
            </button>
        </form>
        );
    
    //Update item
    const updateItem = async (e, open) => {
        e.preventDefault();
        try {
            if (updateItemText.length !== 0) {
                const res = await axios.put(`http://localhost:3001/todos`, { item: updateItemText, id: isUpdating });
                console.log(res.data);
                const updatedItemIndex = props.listItems.findIndex((item) => item._id === isUpdating);
                (props.listItems[updatedItemIndex].item = updateItemText);
                setUpdateItemText("");
                setIsUpdating("");
            } else {
                alert("Please enter a valid todo task");
                setOpen(!open);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Mark the todo item as complete
    const completeTodo = async (id) => {
        const data = await fetch("http://localhost:3001/todo/complete/" + id).then((res) => res.json());
        props.setListItems((listItems) =>
          listItems.map((item) => {
            if (item._id === data._id) {
              item.complete = data.complete;
            }
            return item;
          })
        );
    };

    // Delete item when click on delete
    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/todos/${id}`);
            const newListItems = props.listItems.filter((item) => item._id !== id);
            props.setListItems(newListItems);
        } catch (err) {
        console.log(err);
        }
    };

    return(
        <>
            {props.listItems.length > 0 && <div className="header">Today's Task</div>}
            <div className="content-body">
                <div className="todo-listItems">
                {props.listItems.length > 0 ? ( props.listItems.map((item, index) => (
                    <div className={index % 2 === 0 ? "bck-blue" : "bck-white"}>
                        <div className="todo-item">
                        {isUpdating === item._id ? ( renderUpdateForm()) : (
                            <>
                                <div className={"todo" + (item.complete ? " is-complete" : "")} key={item._id}
                                    onClick={() => completeTodo(item._id)}>
                                    {" "}
                                    <div className="todocheckbox"></div>
                                </div>
                                <p className="text item-content">{item.item}</p>
                                <Icon className="todo-icon" name="edit" tooltip="Edit" theme="light" size="medium"
                                    onClick={() => { setIsUpdating(item._id); }} />
                                <Icon className="todo-icon-del" name="check" tooltip="Done" theme="light" size="medium"
                                    onClick={() => { deleteItem(item._id); }} />
                                <hr className="hr-style" />
                            </>
                        )}
                        </div>
                    </div> ))) : (
                    <p className="todo-no-tasks">You currently have no tasks</p>
                )}
            </div>
            </div>
      </>
    );
}

export default UpdateTodoItem;