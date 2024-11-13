const multer = require("multer");

// Set up memory storage
const storage = multer.memoryStorage();

// Initialize upload with storage configuration
const upload = multer({ storage });

module.exports = upload;
