const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type:String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'
        },
    }, { collection: "users"}
)
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema
};
