/** @format */
/**
 * This component handles user authentication
 */

const router = require('express').Router();
const { User } = require('../mongodb/User');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { valid } = require('joi');

// Validate user input
router.post('/auth', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'Logged in successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error!' });
  }
});
// Generate JWT token
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = router;
