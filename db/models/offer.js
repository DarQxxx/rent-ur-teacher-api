const mongoose = require("mongoose");
const {User} = require('./user.js')
const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    theme: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type:String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    }, { collection: "offers"}
)
const Offer = mongoose.model("Offer", offerSchema);

module.exports = {
    Offer,
    offerSchema
};

