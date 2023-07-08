const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//         email: {
//             type: String,
//             unique: true,
//             required: true,
//             trim: true,
//             lowercase: true
//         },
//         password: {
//             type:String,
//             required: true
//         },
//         name: {
//             type: String,
//             required: true
//         }
//     }, { collection: "users"}
// )
// exports.User = mongoose.model("User", userSchema)

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
