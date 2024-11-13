const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cors = require("cors");
const dotenv = require("dotenv");
const connectCloudinary = require("./utils/cloudinary");

dotenv.config();

const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
//const { default: connectCloudinary } = require("./utils/cloudinary");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
}));
app.use(express.json()); 

// Database connection
mongoose.connect(
    `mongodb+srv://sulesanika25:${process.env.MONGO_PASSWORD}@clustermusic.qibhe.mongodb.net/?retryWrites=true&w=majority&appName=Clustermusic`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

connectCloudinary();

// Passport JWT setup
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.identifier);
        return user ? done(null, user) : done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));
app.use(passport.initialize());

// Log each request
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Base route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes
app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/playlists", playlistRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
