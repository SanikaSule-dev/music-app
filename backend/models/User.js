const mongoose = require("mongoose");

//how to create a model
//step 1 : requirement
//step 2 : create a mongoose schema (structure of a user)
//step 3 : create model

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    likedSongs: {
        // We will change this to array later
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;