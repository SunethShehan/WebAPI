const mongoose = require('mongoose');


const heroSchema = new mongoose.Schema({
    name: { type: String, min: 3, max: 50, },
    birthName: { type: String, required: true },
    likeCount: Number,
    deceased: Boolean,
    superPowers: {
        type: [String], enum: ["Fly", "Invisible","vegitarian"],
        movies: [String]
    }
})

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;