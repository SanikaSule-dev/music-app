const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const User = require("../models/User");

//create playlist
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const currentUser = req.user;

        const { title, thumbnail, tracks } = req.body;

        if(!title || ! thumbnail || !tracks){
            return res.status(400).json({err: "Incomplete details to create playlist"});
        }

        const playlistDetails = { 
            title, 
            thumbnail, 
            owner : currentUser._id, 
            tracks,  
        };

        const createdPlaylist = await Playlist.create(playlistDetails);

        return res.status(201).json(createdPlaylist);
    } catch(error) {
        return res.status(500).json({error: "Failed to create playlist"});
    }  
});

//get playlist by ID
router.get("/get/playlist/:playlistID", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const playlistID = new mongoose.Types.ObjectId(req.params.playlistID);

        const playlist = await Playlist.findOne({_id : playlistID}).populate("tracks");

        if(!playlist){
            return res.status(401).json({error: "Invalid playlist ID"});
        }

        return res.status(200).json(playlist);
    } catch(error) {
        return res.status(500).json({error: "Failed to fetch playlist"});
    }  
});

//get all playlists made by the user
router.get("/get/me", passport.authenticate("jwt", {session: false}), async (req, res) => {
    try {
        const userID = req.user._id;

        const playlists = await Playlist.find({owner : userID}).populate("owner");

        return res.status(200).json(playlists);
    } catch(error) {
        return res.status(500).json({error: "Failed to fetch playlists"});
    }
});

//add song to playlist
router.post("/add/song", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const currentUser = req.user._id;
    const { playlistID, songID } = req.body;

    //step 1: get playlist if valid
    const playlist = await Playlist.findOne({_id : playlistID});
    if(!playlist){
        return res.status(500).json({error: "Failed to fetch playlist"});
    }

    //step 2: check if the user is the owner 
    if(playlist.owner.toString() != currentUser.toString()){
        return res.status(403).json({error: "Not allowed to add songs to the playlist"});
    }

    //step 3: check for valid song
    const song = await Song.findOne({_id : songID});
    if(!song){
        return res.status(404).json({error: "Song does not exists"});
    }

    //step 4: add song to the playlist
    playlist.tracks.push(songID);
    await playlist.save(); //save changes in the database

    return res.status(200).json(playlist);
});

module.exports = router;