const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required : true
    },
    Brand: {
        type: String,
    },
    Attributes: [],
    Description: {
        type: String,
    },
    Price: {
        type: Number,
        required: true,
    },
    Image: {
        type: String,
    },
    Rating: {
        type: mongoose.Decimal128,
    },
    Appearence: {
        type: Number,
        default: 0,
    },
    ProductsViewed: {
        type: Number,
        default: 0,
    },
    ItemID : {
        type : String
    }
});

productSchema.index({Name : 'text',Description:'text',Category:'text'})

const Products = new mongoose.model("Product", productSchema);

module.exports = Products;
