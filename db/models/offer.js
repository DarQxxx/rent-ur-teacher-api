const mongoose = require("mongoose");
const {User} = require('./user.js')
const offerSchema = new mongoose.Schema({
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

