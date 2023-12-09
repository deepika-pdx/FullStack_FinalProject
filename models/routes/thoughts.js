/**
 * This component defines a route that retrieves data from a MongoDB collection named thoughtdata.
 */
const router = require('express').Router();
const { ThoughtData } = require('../mongodb/thoughtdata');

router.get('/thoughts', async (req, res) => {
  // Retrieve all thought data from the MongoDB collection
  try {
    const thoughtData = await ThoughtData.find({});
    return res.status(200).json(thoughtData);
  } catch (e) {
    console.log(e);
  }
});

//export router
module.exports = router;
