const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        match: /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[789]\d{9}$/,
    },
    Type: {
        type: Number,
        default: 0,
    },
    Location : {
        type : []
    },
    Address: {
        type: String,
    },
    RatedProducts : {
        type : []
    },
    Search: [String],
    Cart: [String],
    Orders: [String],
    Click: [String],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
