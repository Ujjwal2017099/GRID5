const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    UserId : {
        type : String,
        required : true
    },
    ProductId: {
        type: String,
        required: true,
    },
    Quantity : {
        type : Number,
        default : 1
    },
    Date : {
        type : Date,
        default : Date.now
    }
});

const Orders = new mongoose.model("Orders", orderSchema);

module.exports = Orders;
