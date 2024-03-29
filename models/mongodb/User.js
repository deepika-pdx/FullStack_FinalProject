/** @format */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
/* This code defines a Mongoose schema for a user.*/
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    waterGlassCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: '7d',
    });
  } catch (err) {
    console.log(err);
  }
  return token;
};

const User = mongoose.model('User', userSchema);

 // validating user details
const validate = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      email: Joi.string().email().required().label('Email Address'),
      password: passwordComplexity().required().label('Password'),
      waterGlassCount: Joi.number().required(),
    });

    return schema.validate(data);
};
module.exports = { User, validate };
