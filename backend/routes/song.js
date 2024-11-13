const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Song = require("../models/Song");
const User = require("../models/User");
const upload = require("../middleware/multer");

// Session used to keep user logged in until logging out
// Keeping false since we need authentication every time
// Using jwt as mentioned in index.js

// Route to create a new 
router.post("/create", upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), passport.authenticate("jwt", { session: false }), async (req, res) => {
        try {
            const { title, artist, duration } = req.body;
            const audioFile = req.files.audio ? req.files.audio[0] : null;
            const imageFile = req.files.image ? req.files.image[0] : null;

            // Validate required fields
            if (!audioFile || !imageFile || !title || !artist || !duration) {
                return res.status(400).json({ error: "All fields and files are required." });
            }

            // Function to upload to Cloudinary
            const uploadToCloudinary = (file, resourceType) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: resourceType },
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result.secure_url);
                        }
                    );
                    stream.end(file.buffer);
                });
            };

            // Upload audio and image to Cloudinary
            const audioUpload = await uploadToCloudinary(audioFile, "video");
            const imageUpload = await uploadToCloudinary(imageFile, "image");

            const songDetails = {
                title,
                thumbnail: imageUpload,
                track: audioUpload,
                artist,
                duration,
            };

            // Create song in the database
            const createdSong = await Song.create(songDetails);
            console.log("Authenticated User: ", req.user);
            console.log("Song Details:", songDetails);

            return res.status(201).json(createdSong);
        } catch (error) {
            console.error("Error creating song:", error);
            return res.status(500).json({ error: "Failed to create song: " + error.message });
        }
    }
);

// Route to get the first 10 songs
router.get("/get/first10songs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const first10Songs = await Song.find({}).limit(10);
        res.status(200).json({ success: true, message: "First 10 songs fetched", songs: first10Songs });
        console.log(first10Songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch first 10 songs", error: error.message });
    }
});


//route to get all songs
router.get("/get/allsongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const allSongs = await Song.find({});
        res.status(200).json({ success: true, message: "All songs fetched", songs: allSongs });
        console.log(allSongs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ success: false, message: "Failed to fetch all songs", error: error.message });
    }
});

//route to get a song by title
router.get("/get/songname/:title", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const title = req.params.title;
        
        // Get song by title
        const songs = await Song.findOne({ title : { $regex: new RegExp(title, "i")}});

        // Return the artist's songs
        return res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching song:", error);
        return res.status(500).json({ error: "Failed to fetch song" });
    }
});

module.exports = router;
