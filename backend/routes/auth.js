const express = require("express");
const router = express.Router(); // For specific module i.e., routes
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helper");

// Register a new user
router.post("/register", async (req, res) => {
    try {
        // Step 1: Extract data from request body
        const { email, password, firstName, lastName, userName } = req.body;

        // Step 2: Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User with the given email already exists" });
        }

        // Step 3: Create a new user in the database
        // Step 3.1: Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserData = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userName,
        };
        const newUser = await User.create(newUserData); // New user created using the given data

        // Step 4: Create a token for the user for unique identification
        const token = getToken(newUser); // Pass only the user object to getToken

        // Step 5: Return the new user details and token
        const userReturn = { ...newUser.toJSON(), token };
        delete userReturn.password; // Do not return the password to the user

        return res.status(201).json(userReturn);
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// User login
router.post("/login", async (req, res) => {
    try {
        // Step 1: Get email and password from the request body
        const { email, password } = req.body;

        // Step 2: Check if the user exists with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        // Step 3: Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        // Step 4: If credentials are correct, generate a token and return it
        const token = getToken(user);
        const userReturn = { ...user.toJSON(), token };
        delete userReturn.password;

        return res.status(200).json(userReturn);
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
