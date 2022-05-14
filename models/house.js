const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        max: 20,
    },
    locationDesc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    price: {
        type: Number,
    },
    likes: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("House", HouseSchema);