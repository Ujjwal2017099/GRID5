const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Products: [String],
});

const Rating = new mongoose.model("Rating", ratingSchema);

module.exports = Rating;
