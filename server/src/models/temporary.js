const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    item_id:{
        type : String
    },
});

const Products = new mongoose.model("Temporary", productSchema);

module.exports = Products;
