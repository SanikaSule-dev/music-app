const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: { //image
        type: String,
        required: true,
    },
    owner: { //playlist made and owned by a user
        type: mongoose.Schema.Types.ObjectId, //every object in database got an ID and its types
        ref: "User", //reference
    },
    tracks: [ //array/list of songs URL thus [] brackets so that mongoose knows its an array
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Song", //album contain songs present in Song model
        }
    ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;