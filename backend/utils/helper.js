// Includes all the common functions that would be used multiple times
const jsonWebToken = require("jsonwebtoken");

const getToken = (user) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        // Generate the token with user identifier and set the expiration time
        const token = jsonWebToken.sign(
            { identifier: user._id }, 
            secretKey, 
            { expiresIn: "5h" } 
        );
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Failed to generate token");
    }
};

module.exports = {
    getToken,
};