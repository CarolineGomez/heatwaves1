const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Ensure you have a User model

// POST endpoint for user registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, age, healthConditions, city, susceptibleToHeatIllness } = req.body;
    // Assume you have a function to handle the registration logic
    const newUser = new User({ email, password, name, age, healthConditions, city, susceptibleToHeatIllness });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ error: "Error registering user", details: error });
  }
});

module.exports = router;