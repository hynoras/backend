const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

// Register a new user
module.exports = {
    register: async (req, res) => {
      try {
        const { username, password } = req.body;
    
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }
    
        // Create new user
        const newUser = await User.create({ username, password });
    
        res.status(201).json({ message: "User registered successfully", user: newUser });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    login: async (req, res) => {
      try {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
          return res.status(401).json({ message: "Invalid username or password" });
        }
    
        const passwordMatch = await bcrypt.compareSync(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid username or password" });
        }
        
        

        return res.status(200).json({ message: "Login successful", userId: user.userId });
      } 
      
      catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
};

