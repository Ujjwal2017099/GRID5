const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Products: [String]
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
