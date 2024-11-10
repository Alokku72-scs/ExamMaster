const bcrypt = require("bcrypt");
const User = require("../models/User");

// Signup route handler
exports.signup = async (req, res) => {
    try {
        const {firstName, lastName, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be registered, try again later",
        });
    }
};



const express = require('express');
const jwt = require('jsonwebtoken');


const router = express.Router();

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If the password matches, generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token and role as a response
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

