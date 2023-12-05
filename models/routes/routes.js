/** @format */

const { localStorage } = require('node-localstorage');
const router = require('express').Router();
const todoItemsModel = require('../mongodb/todoTask');
const bodyParser = require('body-parser');

function getCurrentDate() {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let currentDate = month + '/' + date + '/' + year;
  return currentDate;
}

//Add Todo Item to the database
router.post('/todos', async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
      date: req.body.date,
      email: req.body.email,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//Get data from the database
router.get('/todos', async (req, res) => {
  try {
    let currentDate = getCurrentDate();
    console.log('EMAIL' + req.query.email);
    const allTodoItems = await todoItemsModel.find({
      $and: [{ email: req.query.email, date: currentDate }],
    });

    console.log(allTodoItems);
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//Get data for tomorrow
router.get('/todostomorrow', async (req, res) => {
  try {
    let currentDate = getCurrentDate();
    const allTodoItems = await todoItemsModel
      .find({ email: req.query.email, date: { $ne: currentDate } })
      .sort({ date: 1 });
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//Find an item by its ID and update it
router.put('/todos', async (req, res) => {
  if (req.body.item != null) {
    todoItemsModel.findByIdAndUpdate(
      req.body.id,
      { $set: { item: req.body.item, date: req.body.date } },
      function (err, result) {
        if (err) {
          console.log('ERROR');
          res.send(err);
        } else {
          console.log('CHECK DB');
          res.send(result);
        }
      }
    );
  }
});

//Mark a todo item as complete
router.get('/todo/complete/:id', async (req, res) => {
  const todo = await todoItemsModel.findById(req.params.id);
  if (todo != null) {
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
  }
});

//Find the item by its id and delete it from the database
router.delete('/todos/:id', async (req, res) => {
  try {
    console.log('IN DELETE ID IS ' + req.params.id);
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    console.log('ERROR OCCURED IN DELETE');
    res.json(err);
  }
});

module.exports = router;
