const mongoose = require("mongoose");

const Song = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: { // URL or path to the image file
        type: String,
        required: true,
    },
    track: { // URL or path to the audio file
        type: String,
        required: true,
    },
    artist: { 
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
});

const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
