const router = require('express').Router();
const { User } = require('../mongodb/User');

router.post('/fetchWaterGlassCount', async (req, res) => {
    try {
      const uEmail = req.body.email;
      const userData = await User.findOne({ email: uEmail });
      if (userData !== null) {
        return res.status(200).json(userData);
      } else {
        console.log('Error fetching water glass count..!!');
      }
    } catch (e) {
      console.log(e);
    }
});


router.post('/updateWaterGlassCount', async (req, res) => {
    try {
      const uEmail = req.body.email;
      const glassCount = req.body.waterGlassCount;
      const waterFilter = { email: uEmail };
      const waterUpdate = { waterGlassCount: glassCount };
      const userData = await User.findOneAndUpdate(waterFilter, waterUpdate);
      if (userData !== null) {
        return res.status(200);
      } else {
        console.log('Error updating water glass count..!!');
      }
    } catch (e) {
      console.log(e);
    }
});


router.post('/resetWaterGlassCount', async (req, res) => {
    try {
      const uEmail = req.body.email;
      const waterFilter = { email: uEmail };
      const waterUpdate = { waterGlassCount: 0 };
      const userData = await User.findOneAndUpdate(waterFilter, waterUpdate);
      if (userData !== null) {
        return res.status(200);
      } else {
        console.log('Error resetting water glass count..!!');
      }
    } catch (e) {
      console.log(e);
    }
});

//export router
module.exports = router;