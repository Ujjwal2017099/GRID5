const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
    },
    ProductId: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        default: 1,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
});

const Carts = new mongoose.model("Cart", cartSchema);

module.exports = Carts;
