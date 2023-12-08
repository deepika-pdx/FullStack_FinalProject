const router = require('express').Router();
const { ThoughtData } = require('../mongodb/thoughtdata');

router.get('/thoughts', async (req, res) => {
    try {
      const thoughtData = await ThoughtData.find({});
      console.log(thoughtData);
      return res.status(200).json(thoughtData);
    } catch (e) {
      console.log(e);
    }
  });

//export router
module.exports = router;