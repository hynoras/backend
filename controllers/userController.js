const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const secretKey = "electronicdeviceapp";

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
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
          return res.status(401).json({ message: "Invalid username or password" });
        }
    
        const passwordMatch = await bcrypt.compareSync(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ sub: user.userId }, secretKey);
        if (passwordMatch) {
          jwt.sign(
            { username, id: user.userId },
            secretKey,
            {expiresIn: "1h"},
            (err, token) => {
              if (err) throw err;
              res.cookie("token", token).json({
                token: token,
                id: user.userId,
                username,
              });
            }
          );
        }
      } 
      
      catch (error) {
        console.error("Error occurred during login:", error);
        return res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
};

