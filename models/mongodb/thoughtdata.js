/** @format */

const mongoose = require('mongoose');

/*This model can be used to interact with a MongoDB database and perform CRUD (Create, Read, Update, Delete)
 operations on documents that adhere to the thought schema.*/
const thoughtSchema = new mongoose.Schema({
  thought: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ThoughtData = mongoose.model('ThoughtData', thoughtSchema);

module.exports = { ThoughtData };
