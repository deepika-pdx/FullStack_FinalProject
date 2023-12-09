//import mongoose to create mongoose model
const mongoose = require('mongoose');

//creating todo schema
const TodoItemSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  date: {
    type: String,
  },
  email: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('todotask', TodoItemSchema);
